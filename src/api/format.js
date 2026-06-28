const API_BASE = 'http://localhost:8099'

function flattenCleanup(config) {
  const c = config.cleanup || {}
  return {
    preprocess_spaces: c.text_cleanup?.add_space_between_cn_en ?? true,
    preprocess_punctuation: c.text_cleanup?.punctuation_clean ?? true,
    preprocess_superscript: c.text_cleanup?.clear_superscript ?? true,
    preprocess_soft_return: c.text_cleanup?.soft_enter_to_hard ?? true,
    preprocess_delete_empty_lines: c.text_cleanup?.remove_extra_blank_lines ?? false,
    preprocess_clear_all_styles: c.style_cleanup?.clear_all_styles ?? true,
    preprocess_clear_indents: c.style_cleanup?.clear_paragraph_indent ?? true,
    preprocess_clear_snap_to_grid: c.style_cleanup?.clear_align_grid ?? true,
    preprocess_post_clean_styles: c.style_cleanup?.clean_after_formatting ?? false,
    preprocess_object_wrapping: c.object_structure?.object_wrapping ?? true,
    preprocess_flatten_sdt: c.object_structure?.collapse_sdt_tags ?? false,
    preprocess_tab_mode: parseInt(c.object_structure?.tab_stop_mode || '2'),
    preprocess_fig_caption: c.caption_detection?.fig_detection_enabled ?? true,
    preprocess_fig_caption_spaces: c.caption_detection?.fig_detection_spacing ?? 2,
    preprocess_tbl_caption: c.caption_detection?.tbl_detection_enabled ?? true,
    preprocess_tbl_caption_spaces: c.caption_detection?.tbl_detection_spacing ?? 2,
    auto_refresh_fields: c.global_switches?.auto_refresh_fields ?? false,
    close_word_after_refresh: c.global_switches?.close_word_after_refresh ?? true,
  }
}

export async function formatDocument(file, config) {
  const formData = new FormData()
  formData.append('file', file)

  const backendConfig = { ...config, ...flattenCleanup(config) }
  delete backendConfig.cleanup

  formData.append('config', JSON.stringify(backendConfig))

  const res = await fetch(`${API_BASE}/api/format`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || `HTTP ${res.status}`)
  }

  return await res.blob()
}

export async function healthCheck() {
  const res = await fetch(`${API_BASE}/api/health`)
  return res.ok
}
