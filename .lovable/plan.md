

## Plano de Correção dos Erros de Tradução e Refatoração

### 1. Remover arquivo obsoleto `Index.tsx`

**Arquivo:** `src/pages/Index.tsx`

**Ação:** Deletar completamente o arquivo, pois não está sendo usado nas rotas do `App.tsx` e sua lógica foi migrada para `ProgressContext` e as novas páginas.

---

### 2. Corrigir erro de sintaxe em `Lesson.tsx`

**Arquivo:** `src/pages/Lesson.tsx`

**Problema:** Linha 14 tem ponto-e-vírgula incorreto dentro do JSX

**De:**
```tsx
<LessonContent day={Number(day)} />;
```

**Para:**
```tsx
<LessonContent day={Number(day)} />
```

---

### 3. Remover NavigationPanel duplicado em `IntroLesson.tsx`

**Arquivo:** `src/pages/IntroLesson.tsx`

**Problema:** Renderiza `<NavigationPanel />` duas vezes (linhas 13 e 27)

**Ação:** Remover o segundo `<NavigationPanel />` na linha 27

---

### 4. Corrigir tipo `TranslationObject` para suportar objetos aninhados

**Arquivo:** `src/i18n/types.ts`

**Problema:** O tipo `lessons.intro` está definido como `Record<string, string>` mas os arquivos JSON contêm objetos aninhados como `anatomy_labels`, `posture_labels`, `diagram_labels`

**Ação:** Atualizar a interface para:

```typescript
lessons: {
  intro: Record<string, string | Record<string, string>>;
  chords: Record<string, string>;
  instructions: Record<string, string>;
};
```

---

### 5. Remover uso de `as any` em ProgressCircle

**Arquivo:** `src/components/ProgressCircle.tsx`

**Problema:** Linhas 25-37 usam `t('ui.motivation.xxx' as any)` para contornar erros de tipo

**Ação:** Já que o tipo `TranslationKey` inclui `ui.motivation.${string}`, o `as any` é desnecessário. Remover todas as ocorrências de `as any` nas chamadas de tradução.

---

### Resumo das Alterações

| Arquivo | Ação |
|---------|------|
| `src/pages/Index.tsx` | **DELETAR** |
| `src/pages/Lesson.tsx` | Remover `;` da linha 14 |
| `src/pages/IntroLesson.tsx` | Remover `<NavigationPanel />` duplicado |
| `src/i18n/types.ts` | Atualizar tipo para suportar objetos aninhados |
| `src/components/ProgressCircle.tsx` | Remover `as any` das chamadas `t()` |

