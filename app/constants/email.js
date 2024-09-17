module.exports = {
  client: { NODEMAILER: 'nodeMailer' },
  directory: { INLINE_CSS: 'inline-css', EXTERNAL_CSS: 'external-css' },
  emailTypes: {
    NO_REPLY: {
      TYPE_ID: '1', TYPE: 'No Reply', HOST: 'mail.codexsquared.com', PORT: 465, USER: 'admin@codexsquared.com', PASSWORD: 'codex@0987',
    },
  },
  title: {
    driver: 'Driver Documents Expiry',
    equipment: 'Equipment Documents Expiry',
  },
  url: {
    drivers: 'drivers',
    equipments: 'equipments'
  }
};

