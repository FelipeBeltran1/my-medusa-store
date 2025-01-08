import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { InferTypeOf } from "@medusajs/framework/types"
import { Brand } from "../modules/brand/models/brand"
import { CMS_MODULE } from "../modules/cms"
import CmsModuleService from "../modules/cms/service"

type SyncBrandToCmsStepInput = {
  brand: InferTypeOf<typeof Brand>
}

const syncBrandToCmsStep = createStep(
  "sync-brand-to-cms",
  async ({ brand }: SyncBrandToCmsStepInput, { container }) => {
    const cmsModuleService: CmsModuleService = container.resolve(CMS_MODULE)

    await cmsModuleService.createBrand(brand)

    return new StepResponse(null, brand.id)
  },
  async (id, { container }) => {
    if (!id) {
      return
    }

    const cmsModuleService: CmsModuleService = container.resolve(CMS_MODULE)

    await cmsModuleService.deleteBrand(id)
  }
)