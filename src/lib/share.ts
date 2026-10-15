const TUNER_PATH = "/afinador";

/**
 * Endereço absoluto da página do afinador no site atual.
 * Recebe a origem por parâmetro para ser testável; por padrão usa a janela ativa.
 */
export function tunerShareUrl(origin: string = window.location.origin): string {
  return `${origin.replace(/\/+$/, "")}${TUNER_PATH}`;
}

/** Link de conversa no WhatsApp com a mensagem e o endereço já preenchidos. */
export function whatsappShareUrl(message: string, url: string): string {
  return `https://wa.me/?text=${encodeURIComponent(`${message}\n${url}`)}`;
}

/** Copia um texto, com alternativa para navegadores sem suporte à área de transferência moderna. */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator.clipboard?.writeText === "function") {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Sem permissão ou contexto inseguro: tenta o caminho alternativo abaixo.
    }
  }
  return legacyCopy(text);
}

function legacyCopy(text: string): boolean {
  if (typeof document.execCommand !== "function") {
    return false;
  }

  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.inset = "0 auto auto -9999px";
  document.body.appendChild(field);
  field.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  document.body.removeChild(field);
  return copied;
}
