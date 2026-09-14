const MODULE_ID = 'crooked-moon-encounters-pt-br';
const TCM_PACKS = ['tcm2014-bestiary', 'tcm2014-treasury', 'tcm2014-rollable-tables'];

async function findTCMDocument(name) {
  for (const packName of TCM_PACKS) {
    const pack = game.packs.get(`the-crooked-moon-2014.${packName}`);
    if (!pack) continue;
    const index = await pack.getIndex({fields: ['name', 'type']});
    const match = index.find(entry => entry.name?.toLocaleLowerCase() === name.toLocaleLowerCase());
    if (match) return {uuid: `Compendium.${pack.collection}.${match._id}`, name: match.name};
  }
  return null;
}

async function linkReferences(root) {
  const references = root.querySelectorAll?.('.tcm-reference[data-tcm-name]') ?? [];
  for (const element of references) {
    const name = element.dataset.tcmName;
    const resolved = await findTCMDocument(name);
    if (!resolved) {
      element.classList.add('tcm-reference-missing');
      element.title = `Instale/ative o pack oficial do TCM para abrir: ${name}`;
      continue;
    }
    const link = document.createElement('a');
    link.className = 'content-link entity-link';
    link.dataset.uuid = resolved.uuid;
    link.dataset.id = resolved.uuid.split('.').pop();
    link.dataset.type = 'JournalEntry';
    link.dataset.pack = resolved.uuid.split('.').slice(1, -1).join('.');
    link.innerHTML = `<i class="fas fa-book-open"></i>${resolved.name}`;
    element.replaceWith(link);
  }
}

Hooks.on('renderJournalPageText', async (_page, html) => {
  await linkReferences(html[0] ?? html);
});

Hooks.once('ready', () => {
  if (game.user.isGM && !game.modules.get('the-crooked-moon-2014')?.active) {
    ui.notifications.warn('Ative o módulo oficial The Crooked Moon para que as referências do compêndio sejam clicáveis.');
  }
});
