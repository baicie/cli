import { DEFAULT_TEMPLATE_SRC_GITEE } from '@baicie/help'
import { fetchTemplate } from '../download'
import { templateRoot } from '../util'
import type { IProjectConf } from './types'

export async function fetchTemplates(conf: IProjectConf) {
  const { templateSource } = conf

  if (templateSource === 'default-template') {
    conf.template = 'default'
    conf.templateSource = DEFAULT_TEMPLATE_SRC_GITEE
  }

  // templates
  const templates = await fetchTemplate(conf.templateSource, templateRoot)
  // 筛选
  return templates
}
