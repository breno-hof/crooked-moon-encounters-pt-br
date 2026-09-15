const TCM_PACKS = ['tcm2014-bestiary', 'tcm2014-treasury', 'tcm2014-rollable-tables'];

async function findTCMDocument(name) {
  for (const packName of TCM_PACKS) {
    const pack = game.packs.get(`the-crooked-moon-2014.${packName}`);
    if (!pack) continue;
    const index = await pack.getIndex({fields: ['name', 'type']});
    const match = index.find(entry => entry.name?.toLocaleLowerCase() === name.toLocaleLowerCase());
    if (match) {
      const documentType = pack.documentName || (packName === 'tcm2014-bestiary' ? 'Actor' : packName === 'tcm2014-rollable-tables' ? 'RollTable' : 'Item');
      return {uuid: `Compendium.${pack.collection}.${documentType}.${match._id}`, name: match.name};
    }
  }
  return null;
}

async function linkReferences(root) {
  const references = [...(root.querySelectorAll?.('.tcm-reference[data-tcm-name]') ?? [])];
  if (!references.length) return;
  for (const element of references) {
    const name = element.dataset.tcmName;
    const resolved = await findTCMDocument(name);
    if (!resolved) {
      element.classList.add('tcm-reference-missing');
      element.title = `Instale/ative o pack oficial do TCM para abrir: ${name}`;
      continue;
    }
    // Replace the marker with Foundry's native UUID syntax, then let core enrich it.
    element.outerHTML = `@UUID[${resolved.uuid}]{${resolved.name}}`;
  }
  if (typeof TextEditor?.enrichHTML === 'function') {
    root.innerHTML = await TextEditor.enrichHTML(root.innerHTML, {async: true});
  }
}

// Foundry VTT v13 hook for rendered Journal text pages.
Hooks.on('renderJournalEntryPageTextSheet', async (_application, html) => {
  const root = html instanceof HTMLElement ? html : html?.[0];
  if (root) await linkReferences(root);
});

Hooks.once('ready', () => {
  if (game.user.isGM && !game.modules.get('the-crooked-moon-2014')?.active) {
    ui.notifications.warn('Ative o módulo oficial The Crooked Moon para que as referências do compêndio sejam clicáveis.');
  }
});
