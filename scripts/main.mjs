import encounters from '../data/encounters.json' with { type: 'json' };

const MODULE_ID = 'crooked-moon-encounters-pt-br';
const TABLE_NAME = 'The Crooked Moon — Encontros (PT-BR)';

Hooks.once('ready', async () => {
  if (!game.user.isGM) return;
  const existing = game.tables.find(t => t.getFlag(MODULE_ID, 'managed') === true);
  if (existing) return;
  const table = await RollTable.create({
    name: TABLE_NAME,
    description: 'Tabela comunitária com resumos em português e referências ao módulo oficial The Crooked Moon.',
    formula: '1d22',
    replacement: true,
    displayRoll: true,
    results: encounters.map((e) => ({
      type: CONST.TABLE_RESULT_TYPES.TEXT,
      text: e.result,
      weight: 1,
      range: [e.id, e.id],
      drawn: false,
      flags: { [MODULE_ID]: { encounterId: e.id, references: e.references } }
    })),
    flags: { [MODULE_ID]: { managed: true, source: 'CM_Cards_Encounters.pdf', language: 'pt-BR' } }
  });
  ui.notifications.info(`Tabela criada: ${table.name}`);
});
