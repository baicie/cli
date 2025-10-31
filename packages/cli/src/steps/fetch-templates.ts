import { DEFAULT_TEMPLATE_SRC_GITEE, templateRoot } from '../util'
import { type ITemplates, fetchTemplate } from '../download'
import type { IProjectConf } from './types'

export async function fetchTemplates(
  conf: IProjectConf,
  options: IProjectConf,
): Promise<ITemplates[]> {
  const { templateSource, logger } = conf
  logger.debug(`templateSource: ${templateSource}`)

  if (templateSource === 'default-template') {
    conf.template = 'default'
    conf.templateSource = DEFAULT_TEMPLATE_SRC_GITEE
  }

  // templates
  const templates = await fetchTemplate(
    conf.templateSource,
    templateRoot,
    options,
  )
  // 筛选
  return templates
}
