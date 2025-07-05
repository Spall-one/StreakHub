'use strict';

module.exports = {
  async findCurrent(ctx) {
    const { slug } = ctx.params;
    const channel = await strapi.entityService.findMany('api::canale.canale', {
      filters: { slug },
      populate: { trasmissioni: true },
    });
    if (!channel || channel.length === 0) {
      return ctx.notFound();
    }
    const canale = channel[0];
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const transmissions = await strapi.entityService.findMany('api::trasmissione.trasmissione', {
      filters: { canale: canale.id, data: today },
      populate: { streamer: true },
      sort: { ora_inizio: 'asc' },
    });
    let current = null;
    const upcoming = [];
    for (const t of transmissions) {
      const start = new Date(`${t.data}T${t.ora_inizio}`);
      const end = new Date(start.getTime() + t.durata_minuti * 60000);
      if (now >= start && now <= end) {
        current = t;
      } else if (start > now) {
        upcoming.push({ orario: t.ora_inizio, titolo: t.titolo, streamer: t.streamer.nome });
      }
    }
    ctx.send({
      attuale: current
        ? {
            titolo: current.titolo,
            streamer: {
              nome: current.streamer.nome,
              avatar: current.streamer.avatar,
              social_links: current.streamer.social_links,
            },
            codice_embed: current.codice_embed,
          }
        : null,
      prossime: upcoming,
    });
  },
};
