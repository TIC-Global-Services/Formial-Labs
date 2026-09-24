/**
 * Formial assessment intake.
 * POST  -> append row, email the team + the customer, return { ok, submissionId }
 * GET   -> ?submissionId=<uuid> returns ONLY the non-sensitive fields
 *
 * NOTE: the option -> label maps below mirror components/SkinAssessment/assessmentData.ts.
 * If you add or rename an option in the app, update the map here too.
 */

const ADMIN_RECIPIENTS = ['admin@formial.in', 'care@formial.in'];
const SUPPORT_EMAIL = 'care@formial.in';
const SITE_URL = 'https://formial.in'; // <- check: used for the "View your results" button
const BRAND_NAME = 'Formial Labs';
const SHEET_NAME = 'Submissions';
const MAX_BODY_CHARS = 20000;

const HEADERS = [
  'timestamp', 'submissionId', 'needsDermReview',
  'firstName', 'lastName', 'age', 'gender', 'email', 'phone',
  'concerns', 'otherConcerns', 'skinType', 'duration', 'sensitivity', 'productsUsed',
  'onMedication', 'medicationDetails', 'hasAllergy', 'allergyDetails',
  'pregnantOrBreastfeeding', 'hearAboutUs',
  'publicJson', // raw-value subset served back by doGet
];

const LABELS = {
  concern: {
    'acne-marks': 'Acne',
    'scarring': 'Scarring',
    'hyperpigmentation': 'Hyperpigmentation',
    'fine-lines-ageing': 'Fine Lines / Ageing',
    'melasma': 'Melasma',
    'skincare-routine': 'Skincare Routine / Skin Concerns',
    'uneven-skintone': 'Uneven Skintone',
    'post-inflammatory-marks': 'Post Inflammatory Marks',
    'pustules': 'Pustules',
    'closed-comedones': 'Closed Comedones',
  },
  skinType: {
    'deeply-dry': 'Deeply Dry',
    'dry-skin': 'Dry Skin',
    'oily-skin': 'Oily Skin',
    'combination-skin': 'Combination Skin',
    'excessively-oily': 'Excessively Oily',
    'not-sure': 'Not Sure Yet',
  },
  duration: {
    'less-than-month': 'Less than a month',
    '1-2-months': '1 - 2 months',
    '2-6-months': '2 - 6 months',
    '6-12-months': '6 - 12 months',
    'more-than-year': 'More than a year',
    'not-sure': 'Not sure yet',
  },
  product: {
    'cleanser': 'Cleanser',
    'moisturiser': 'Moisturiser',
    'sunscreen': 'Sunscreen',
    'makeup': 'Makeup',
    'serum': 'Serum',
    'none': 'None of the above',
  },
  gender: { male: 'Male', female: 'Female', other: 'Other' },
  hear: {
    'instagram': 'Instagram',
    'reddit': 'Reddit',
    'ads': 'Ads',
    'media-coverage': 'Media Coverage',
    'blogs-medium': 'Blogs & Medium',
    'friends-family': 'Friends & Family',
  },
  yesNo: { yes: 'Yes', no: 'No' },
};

/* ------------------------------------------------------------------ */
/* Web app entry points                                                */
/* ------------------------------------------------------------------ */

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const raw = e && e.postData && e.postData.contents;
    if (!raw || raw.length > MAX_BODY_CHARS) return json_({ ok: false, error: 'bad_request' });

    const a = JSON.parse(raw);
    if (!str_(a.firstName) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str_(a.email))) {
      return json_({ ok: false, error: 'invalid' });
    }

    const submissionId = Utilities.getUuid();
    const needsDermReview =
      a.onMedication === 'yes' || a.hasAllergy === 'yes' || a.pregnantOrBreastfeeding === 'yes';

    // Raw values on purpose: the results page maps these back to its own option lists.
    const publicData = {
      firstName: str_(a.firstName),
      concerns: list_(a.concerns),
      otherConcerns: list_(a.otherConcerns),
      skinType: str_(a.skinType),
      duration: str_(a.duration),
      sensitivity: a.sensitivity === 'not-sure' ? 'not-sure' : Number(a.sensitivity) || null,
      productsUsed: list_(a.productsUsed),
    };

    const d = readable_(a);

    // The sheet gets human-readable labels, not internal option keys.
    const row = [
      new Date(), submissionId, needsDermReview ? 'YES' : 'no',
      a.firstName, a.lastName, a.age, d.gender, a.email, d.phone,
      d.concerns.join(', '), d.otherConcerns.join(', '), d.skinType, d.duration, d.sensitivity, d.products.join(', '),
      d.onMedication, a.medicationDetails, d.hasAllergy, a.allergyDetails,
      d.pregnant, d.hear,
      JSON.stringify(publicData),
    ].map(cell_);

    lock.waitLock(10000);
    getSheet_().appendRow(row);
    lock.releaseLock();

    // Email problems must never fail the submission.
    try { notifyAdmin_(a, d, submissionId, needsDermReview); }
    catch (err) { console.error('admin mail failed', err); }
    try { notifyCustomer_(a, d, submissionId, needsDermReview); }
    catch (err) { console.error('customer mail failed', err); }

    return json_({ ok: true, submissionId: submissionId });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server_error' });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function doGet(e) {
  try {
    const id = e && e.parameter && e.parameter.submissionId;
    if (!id || !/^[0-9a-f-]{36}$/i.test(id)) return json_({ ok: false, error: 'bad_id' });

    const sheet = getSheet_();
    const last = sheet.getLastRow();
    if (last < 2) return json_({ ok: false, error: 'not_found' });

    const idCol = HEADERS.indexOf('submissionId') + 1;
    const hit = sheet.getRange(2, idCol, last - 1, 1)
      .createTextFinder(id).matchEntireCell(true).findNext();
    if (!hit) return json_({ ok: false, error: 'not_found' });

    const pub = sheet.getRange(hit.getRow(), HEADERS.indexOf('publicJson') + 1).getValue();
    return json_({ ok: true, answers: JSON.parse(pub) });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server_error' });
  }
}

/* ------------------------------------------------------------------ */
/* Answer formatting                                                   */
/* ------------------------------------------------------------------ */

function label_(map, value) {
  const v = str_(value);
  if (!v) return '';
  return map[v] || v;
}

function labels_(map, values) {
  return list_(values).map(function (v) { return label_(map, v); });
}

// Everything in one place, already turned into words.
function readable_(a) {
  const concerns = labels_(LABELS.concern, a.concerns);
  const otherConcerns = labels_(LABELS.concern, a.otherConcerns);
  const primary = concerns[0] || otherConcerns[0] || 'your skin';
  return {
    concerns: concerns,
    otherConcerns: otherConcerns,
    primary: primary,
    skinType: label_(LABELS.skinType, a.skinType),
    duration: label_(LABELS.duration, a.duration),
    sensitivity: a.sensitivity === 'not-sure' ? 'Not sure' : (a.sensitivity ? a.sensitivity + ' out of 5' : ''),
    products: labels_(LABELS.product, a.productsUsed),
    onMedication: label_(LABELS.yesNo, a.onMedication),
    hasAllergy: label_(LABELS.yesNo, a.hasAllergy),
    pregnant: label_(LABELS.yesNo, a.pregnantOrBreastfeeding),
    gender: label_(LABELS.gender, a.gender),
    hear: label_(LABELS.hear, a.hearAboutUs),
    phone: (str_(a.countryDial) + ' ' + str_(a.phone)).trim(),
  };
}

// The full questionnaire, question text exactly as a customer reads it.
function buildSections_(a, d) {
  const none = '-';
  const orNone = function (list) { return list.length ? list.join(', ') : none; };
  const withDetails = function (answer, details) {
    if (!answer) return none;
    return answer === 'Yes' && str_(details) ? 'Yes - ' + str_(details) : answer;
  };

  return [
    {
      title: 'Skin assessment',
      items: [
        { q: 'What best describes your skin concerns?', a: orNone(d.concerns) },
        { q: 'Anything else? The more we know, the more precise your formula.', a: orNone(d.otherConcerns) },
        { q: 'Since ' + d.primary + ' is your main concern, what\'s your skin type?', a: d.skinType || none },
        { q: 'How long has ' + d.primary + ' been an issue?', a: d.duration || none },
        { q: 'On a scale of 1-5, how sensitive is your skin?', a: d.sensitivity || none },
        { q: 'What have you tried for your ' + d.primary + ' so far?', a: orNone(d.products) },
      ],
    },
    {
      title: 'Health & safety',
      items: [
        { q: 'Are you currently on any medications?', a: withDetails(d.onMedication, a.medicationDetails) },
        { q: 'Are you allergic to any medications?', a: withDetails(d.hasAllergy, a.allergyDetails) },
        { q: 'Are you pregnant or breastfeeding?', a: d.pregnant || none },
      ],
    },
    {
      title: 'Claim your formula (contact details)',
      items: [
        { q: 'Legal first name', a: str_(a.firstName) || none },
        { q: 'Legal last name', a: str_(a.lastName) || none },
        { q: 'Age', a: str_(a.age) || none },
        { q: 'Gender', a: d.gender || none },
        { q: 'Email address', a: str_(a.email) || none },
        { q: 'Phone number', a: d.phone || none },
      ],
    },
    {
      title: 'Attribution',
      items: [{ q: 'How did you find us?', a: d.hear || none }],
    },
  ];
}

/* ------------------------------------------------------------------ */
/* Emails                                                              */
/* ------------------------------------------------------------------ */

function notifyAdmin_(a, d, id, needsDermReview) {
  const sections = buildSections_(a, d);
  const fullName = (str_(a.firstName) + ' ' + str_(a.lastName)).trim();

  const text = [
    'NEW FORMIAL ASSESSMENT' + (needsDermReview ? '  [NEEDS DERM REVIEW]' : ''),
    fullName + ' <' + str_(a.email) + '>',
    '',
  ].concat(sections.map(function (s) {
    return s.title.toUpperCase() + '\n' + s.items.map(function (i) {
      return i.q + '\n  -> ' + i.a;
    }).join('\n');
  })).concat(['', 'Submission ID: ' + id]).join('\n\n');

  const flag = needsDermReview
    ? '<span style="display:inline-block;background:#b3261e;color:#ffffff;font:700 11px Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;padding:5px 10px;border-radius:4px;">Needs derm review</span>'
    : '<span style="display:inline-block;background:#e6f4ea;color:#137333;font:700 11px Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;padding:5px 10px;border-radius:4px;">No flags</span>';

  const sectionsHtml = sections.map(function (s) {
    const rows = s.items.map(function (i) {
      return '<tr>'
        + '<td style="padding:10px 14px;border-top:1px solid #e5e7eb;font:13px/1.4 Arial,sans-serif;color:#6b7280;width:46%;vertical-align:top;">' + esc_(i.q) + '</td>'
        + '<td style="padding:10px 14px;border-top:1px solid #e5e7eb;font:600 14px/1.4 Arial,sans-serif;color:#111827;vertical-align:top;">' + esc_(i.a) + '</td>'
        + '</tr>';
    }).join('');
    return '<tr><td style="padding:22px 0 8px;font:700 12px Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#004763;">' + esc_(s.title) + '</td></tr>'
      + '<tr><td><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:8px;border-collapse:separate;">' + rows + '</table></td></tr>';
  }).join('');

  const html = '<!doctype html><html><body style="margin:0;padding:0;background:#f3f4f6;">'
    + '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6;"><tr><td align="center" style="padding:24px 12px;">'
    + '<table role="presentation" width="640" cellspacing="0" cellpadding="0" style="width:100%;max-width:640px;background:#ffffff;border-radius:10px;overflow:hidden;">'
    + '<tr><td style="background:#111827;padding:18px 24px;font:700 13px Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#ffffff;">' + esc_(BRAND_NAME) + ' &middot; Internal</td></tr>'
    + '<tr><td style="padding:24px 24px 4px;">'
    + '<div style="font:700 22px/1.25 Arial,sans-serif;color:#111827;">New assessment: ' + esc_(fullName) + '</div>'
    + '<div style="margin-top:10px;">' + flag + '</div>'
    + '<div style="margin-top:12px;font:14px/1.5 Arial,sans-serif;color:#374151;">'
    + '<a href="mailto:' + esc_(a.email) + '" style="color:#004763;">' + esc_(a.email) + '</a> &nbsp;|&nbsp; ' + esc_(d.phone)
    + '</div></td></tr>'
    + '<tr><td style="padding:0 24px 24px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0">' + sectionsHtml + '</table></td></tr>'
    + '<tr><td style="background:#f9fafb;padding:14px 24px;font:12px Arial,sans-serif;color:#6b7280;">Submission ID: ' + esc_(id) + ' &middot; Reply to this email to write to the customer.</td></tr>'
    + '</table></td></tr></table></body></html>';

  MailApp.sendEmail({
    to: ADMIN_RECIPIENTS.join(','),
    replyTo: str_(a.email),
    name: BRAND_NAME + ' Assessments',
    subject: (needsDermReview ? '[Derm review] ' : '') + 'New assessment: ' + fullName + ' (' + d.primary + ')',
    body: text,
    htmlBody: html,
  });
}

function notifyCustomer_(a, d, id, needsDermReview) {
  const first = str_(a.firstName).split(/\s+/)[0];
  const resultsUrl = SITE_URL + '/skin-assesment-result?submissionId=' + encodeURIComponent(id);

  const summary = [
    ['Your main concern', d.primary],
    ['Skin type', d.skinType],
    ['How long it has been an issue', d.duration],
  ].filter(function (r) { return r[1]; });

  const summaryHtml = summary.map(function (r) {
    return '<tr>'
      + '<td style="padding:8px 0;font:14px/1.4 Arial,sans-serif;color:#5b7c8d;width:48%;vertical-align:top;">' + esc_(r[0]) + '</td>'
      + '<td style="padding:8px 0;font:italic 17px/1.3 Georgia,\'Times New Roman\',serif;color:#004763;vertical-align:top;">' + esc_(r[1]) + '</td>'
      + '</tr>';
  }).join('');

  const steps = [
    ['1', 'A dermatologist reviews your answers', 'Every assessment is read by a person, not just matched by a script.'],
    ['2', 'Your formula is curated for you', 'Chosen from what you told us about your skin, not picked off a shelf.'],
    ['3', 'We stay in touch', 'If we need anything more from you, we will reach out by email or phone.'],
  ];
  const stepsHtml = steps.map(function (s) {
    return '<tr>'
      + '<td width="36" valign="top" style="padding:10px 0;"><div style="width:28px;height:28px;line-height:28px;text-align:center;border-radius:14px;background:#004763;color:#ffffff;font:700 13px Arial,sans-serif;">' + s[0] + '</div></td>'
      + '<td valign="top" style="padding:10px 0 10px 8px;"><div style="font:700 15px/1.3 Arial,sans-serif;color:#004763;">' + esc_(s[1]) + '</div>'
      + '<div style="margin-top:3px;font:14px/1.5 Arial,sans-serif;color:#525252;">' + esc_(s[2]) + '</div></td>'
      + '</tr>';
  }).join('');

  const careNote = needsDermReview
    ? '<tr><td style="padding:0 32px 8px;"><div style="background:#eaf6fc;border-radius:10px;padding:14px 16px;font:14px/1.5 Arial,sans-serif;color:#004763;">'
      + 'You mentioned a medication, allergy or pregnancy. Our dermatologist will take a little extra care with your review, so your formula stays safe for you.'
      + '</div></td></tr>'
    : '';

  const html = '<!doctype html><html><body style="margin:0;padding:0;background:#eaf6fc;">'
    + '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eaf6fc;"><tr><td align="center" style="padding:28px 12px;">'
    + '<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;">'
    + '<tr><td align="center" style="background:#004763;padding:30px 24px;">'
    + '<div style="font:700 13px Arial,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#b5e7ff;">' + esc_(BRAND_NAME) + '</div>'
    + '<div style="margin-top:14px;font:30px/1.2 Georgia,\'Times New Roman\',serif;color:#ffffff;">Hi ' + esc_(first) + ', we\'ve got your assessment.</div>'
    + '</td></tr>'
    + '<tr><td style="padding:28px 32px 8px;font:16px/1.6 Arial,sans-serif;color:#374151;">'
    + 'Thank you for taking the time. Here is what you told us about your skin, so you can check we got it right.'
    + '</td></tr>'
    + '<tr><td style="padding:8px 32px 20px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3fbff;border-radius:12px;"><tr><td style="padding:12px 20px;">'
    + '<table role="presentation" width="100%" cellspacing="0" cellpadding="0">' + summaryHtml + '</table>'
    + '</td></tr></table></td></tr>'
    + careNote
    + '<tr><td style="padding:12px 32px 0;font:700 12px Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#5b7c8d;">What happens next</td></tr>'
    + '<tr><td style="padding:4px 32px 8px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0">' + stepsHtml + '</table></td></tr>'
    + '<tr><td align="center" style="padding:20px 32px 8px;"><a href="' + esc_(resultsUrl) + '" style="display:inline-block;background:#004763;color:#ffffff;text-decoration:none;font:700 13px Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;padding:15px 30px;border-radius:999px;">View your results</a></td></tr>'
    + '<tr><td align="center" style="padding:20px 32px 30px;font:13px/1.6 Arial,sans-serif;color:#6b7280;">Questions? Just reply to this email or write to <a href="mailto:' + SUPPORT_EMAIL + '" style="color:#004763;">' + SUPPORT_EMAIL + '</a>.</td></tr>'
    + '</table>'
    + '<div style="max-width:600px;padding:16px 12px 0;font:12px/1.5 Arial,sans-serif;color:#7a8b95;text-align:center;">You are receiving this because you completed the skin assessment at ' + esc_(SITE_URL.replace(/^https?:\/\//, '')) + '.</div>'
    + '</td></tr></table></body></html>';

  const text = [
    'Hi ' + first + ', we\'ve got your assessment.',
    '',
    'Thank you for taking the time. Here is what you told us:',
  ].concat(summary.map(function (r) { return '- ' + r[0] + ': ' + r[1]; })).concat([
    '',
    'What happens next',
    '1. A dermatologist reviews your answers.',
    '2. Your formula is curated for you.',
    '3. We stay in touch by email or phone if we need anything more.',
    '',
    'View your results: ' + resultsUrl,
    '',
    'Questions? Reply to this email or write to ' + SUPPORT_EMAIL + '.',
  ]).join('\n');

  MailApp.sendEmail({
    to: str_(a.email),
    replyTo: SUPPORT_EMAIL,
    name: BRAND_NAME,
    subject: first + ', we\'ve received your skin assessment',
    body: text,
    htmlBody: html,
  });
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// HTML-escape everything user-supplied before it goes into an email.
function esc_(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function str_(v) { return v == null ? '' : String(v).slice(0, 500); }
function list_(v) { return Array.isArray(v) ? v.map(str_) : []; }

// Stop Sheets treating user text as a formula (=, +, -, @ at the start).
function cell_(v) {
  if (typeof v !== 'string') return v;
  const s = v.slice(0, 500);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}
