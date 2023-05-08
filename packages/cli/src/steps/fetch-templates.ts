import { DEFAULT_TEMPLATE_SRC_GITEE, templateRoot } from '../util'
import { fetchTemplate } from '../download'

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
