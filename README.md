# The Crooked Moon — Encontros (PT-BR)

Módulo comunitário para Foundry VTT que fornece **dois compêndios**: 22 Journal Entries de encontros em português e uma Roll Table que aponta para esses Journals inspirados nas cartas de encontros de *The Crooked Moon*.

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
5. Os compêndios `Encontros (PT-BR) — Journals` e `Encontros (PT-BR) — Roll Table` aparecem na aba de Compêndios, ambos com acesso padrão **somente para o Mestre**. A Roll Table abre o Journal correspondente a cada resultado. Nenhuma tabela ou documento é reinjetado no mundo.

## Compatibilidade

- Foundry VTT 13 e 14;
- sistema D&D 5e;
- módulo oficial The Crooked Moon 2.4.1 ou superior.

## Desenvolvimento

Os dados públicos e resumidos estão em `data/encounters.json`. Cada Journal Entry é separado em **Cenário**, **Desenvolvimento** e **Resultado**. As referências são resolvidas dinamicamente contra os índices reais dos packs oficiais do TCM, gerando links Foundry `content-link` com o UUID correto. O módulo apenas disponibiliza os dois compêndios próprios, evitando reinjetar tabelas ou duplicar os compêndios proprietários do módulo oficial.

Uma release é criada automaticamente ao publicar uma tag no formato `vMAJOR.MINOR.PATCH`.
