import encounters from '../data/encounters.json' with { type: 'json' };

const MODULE_ID = 'crooked-moon-encounters-pt-br';
const TABLE_NAME = 'The Crooked Moon — Encontros (PT-BR)';
const SCHEMA_VERSION = 2;

function tableData() {
  return {
    name: TABLE_NAME,
    description: 'Tabela comunitária com resumos em português e referências ao módulo oficial The Crooked Moon. Visível somente ao Mestre.',
    formula: '1d22',
    replacement: true,
    displayRoll: true,
    ownership: { default: 0 },
    results: encounters.map((e) => ({
      type: CONST.TABLE_RESULT_TYPES.TEXT,
      text: e.result,
      weight: 1,
      range: [e.id, e.id],
      drawn: false,
      flags: { [MODULE_ID]: { encounterId: e.id, references: e.references } }
    })),
    flags: { [MODULE_ID]: { managed: true, schemaVersion: SCHEMA_VERSION, source: 'CM_Cards_Encounters.pdf', language: 'pt-BR' } }
  };
}

Hooks.once('ready', async () => {
  if (!game.user.isGM) return;
  const existing = game.tables.find(t => t.getFlag(MODULE_ID, 'managed') === true);
  if (existing) {
    if (existing.getFlag(MODULE_ID, 'schemaVersion') !== SCHEMA_VERSION) {
      await existing.update(tableData());
      ui.notifications.info(`Tabela atualizada: ${existing.name}`);
    }
    return;
  }
  const table = await RollTable.create(tableData());
  ui.notifications.info(`Tabela criada: ${table.name}`);
});
