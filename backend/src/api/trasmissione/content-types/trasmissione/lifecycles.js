module.exports = {
  async beforeCreate(event) {
    await validateNoOverlap(event.params.data, strapi);
  },
  async beforeUpdate(event) {
    await validateNoOverlap(event.params.data, strapi, event.params.where.id);
  },
};

async function validateNoOverlap(data, strapiInstance, currentId) {
  if (!data.canale || !data.data || !data.ora_inizio || !data.durata_minuti) return;
  const start = new Date(`${data.data}T${data.ora_inizio}`);
  const end = new Date(start.getTime() + data.durata_minuti * 60000);
  const query = {
    filters: {
      canale: data.canale,
      data: data.data,
    },
  };
  const existing = await strapiInstance.entityService.findMany('api::trasmissione.trasmissione', query);
  for (const t of existing) {
    if (currentId && t.id === currentId) continue;
    const tStart = new Date(`${t.data}T${t.ora_inizio}`);
    const tEnd = new Date(tStart.getTime() + t.durata_minuti * 60000);
    if (start < tEnd && end > tStart) {
      throw new Error('Overlapping trasmissione on this canale');
    }
  }
}
