# The Crooked Moon — Encontros (PT-BR)

Módulo comunitário para Foundry VTT que cria automaticamente uma **Roll Table com 22 encontros resumidos em português** inspirados nas cartas de encontros de *The Crooked Moon*.

## Escopo e direitos autorais

Este repositório contém apenas **títulos, resumos originais em português e referências técnicas**. Ele não redistribui o texto integral, imagens ou compêndios de *The Crooked Moon*. O conteúdo oficial deve ser adquirido/instalado separadamente.

As referências usam os packs oficiais do módulo `the-crooked-moon-2014`:

- `tcm2014-bestiary` — criaturas;
- `tcm2014-treasury` — itens;
- `tcm2014-rollable-tables` — tabelas relacionadas.

## Instalação

1. Instale o sistema **D&D 5e**.
2. Instale o módulo oficial **The Crooked Moon 2014 & 2024**.
3. No Foundry, instale este módulo usando o manifesto:

   `https://github.com/breno-hof/crooked-moon-encounters-pt-br/releases/latest/download/module.json`

4. Ative os dois módulos no mundo.
5. Um GM deve entrar no mundo; a tabela `The Crooked Moon — Encontros (PT-BR)` será criada automaticamente uma única vez e terá acesso padrão **somente para o Mestre**. Se a tabela já existir de uma versão anterior, ela será atualizada pelo módulo.

## Compatibilidade

- Foundry VTT 13 e 14;
- sistema D&D 5e;
- módulo oficial The Crooked Moon 2.4.1 ou superior.

## Desenvolvimento

Os dados públicos e resumidos estão em `data/encounters.json`. Cada `summary` e `result` contém links de compêndio para as criaturas, itens e tabelas necessários à montagem do encontro. O script de inicialização cria a Roll Table no mundo, evitando empacotar ou duplicar os compêndios proprietários do módulo oficial.

Uma release é criada automaticamente ao publicar uma tag no formato `vMAJOR.MINOR.PATCH`.
