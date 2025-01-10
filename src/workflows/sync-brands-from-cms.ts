import {
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import CmsModuleService from "../modules/cms/service"
import BrandModuleService from "../modules/brand/service"
import { CMS_MODULE } from "../modules/cms"
import { BRAND_MODULE } from "../modules/brand"

type CreateBrand = {
  name: string
}

type CreateBrandsInput = {
  brands: CreateBrand[]
}

const retrieveBrandsFromCmsStep = createStep(
  "retrieve-brands-from-cms",
  async (_, { container }) => {
    const cmsModuleService: CmsModuleService = container.resolve(
      CMS_MODULE
    )

    const brands = await cmsModuleService.retrieveBrands()

    return new StepResponse(brands)
  }
)

export const createBrandsStep = createStep(
  "create-brands-step",
  async (input: CreateBrandsInput, { container }) => {
    const BrandModuleService: BrandModuleService = container.resolve(
      BRAND_MODULE
    )

    const brands = await BrandModuleService.createBrands(input.brands)

    return new StepResponse(brands, brands)
  },
  async (brands, { container }) => {
    if (!brands) return

    const brandModuleService: BrandModuleService = container.resolve(
      BRAND_MODULE
    )

    await brandModuleService.deleteBrands(brands.map((brand) => brand.id))
  }
)