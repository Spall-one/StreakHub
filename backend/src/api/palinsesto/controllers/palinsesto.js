'use strict';
const xlsx = require('xlsx');

module.exports = {
  async downloadTemplate(ctx) {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.aoa_to_sheet([
      [
        'Data',
        'OraInizio',
        'DurataMinuti',
        'CanaleSlug',
        'StreamerSlug',
        'Titolo',
        'CodiceEmbed',
      ],
    ]);
    xlsx.utils.book_append_sheet(wb, ws, 'Template');
    const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
    ctx.set('Content-disposition', 'attachment; filename=palinsesto_template.xlsx');
    ctx.set('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    ctx.body = buffer;
  },

  async upload(ctx) {
    const { files } = ctx.request;
    if (!files || !files.file) {
      return ctx.badRequest('No file uploaded');
    }
    const workbook = xlsx.readFile(files.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (const row of data) {
      const channel = await findChannelBySlug(row.CanaleSlug);
      const streamer = await findStreamerBySlug(row.StreamerSlug);
      if (!channel || !streamer) continue;
      await strapi.entityService.create('api::trasmissione.trasmissione', {
        data: {
          data: row.Data,
          ora_inizio: row.OraInizio,
          durata_minuti: row.DurataMinuti,
          titolo: row.Titolo,
          codice_embed: row.CodiceEmbed || '',
          canale: channel.id,
          streamer: streamer.id,
        },
      });
    }
    ctx.send({ imported: data.length });
  },
};

async function findChannelBySlug(slug) {
  const res = await strapi.entityService.findMany('api::canale.canale', {
    filters: { slug },
  });
  return res[0];
}

async function findStreamerBySlug(slug) {
  const res = await strapi.entityService.findMany('api::streamer.streamer', {
    filters: { slug },
  });
  return res[0];
}
