/* eslint-disable no-console */
const translateRu = require('../../models/languages/ru.json');
const translateEn = require('../../models/languages/en.json');

const localeTranslate = {
  en: translateEn,
  ru: translateRu,
};

const i18nController = async (req, res) => {
  const { locale } = req.params;

  // eslint-disable-next-line no-console
  console.info('i18nNamespacesController catch request', locale);

  const translate = localeTranslate[locale];

  res.status(200).json({ translate });
};

module.exports = {
  i18nController,
};
