import { useRouter } from 'next/router'
import type { ChangeEvent, HTMLAttributes } from 'react'

import SkuSelector from './SkuSelector'
import { navigateToSku } from './skuVariants'
import type { SkuVariantsByName } from './skuVariants'

interface Props extends HTMLAttributes<HTMLDivElement> {
  /**
   * Maps property value combinations to their respective SKU's slug
   */
  slugsMap: Record<string, string>
  /**
   * Available options for each varying SKU property, taking into account the `dominantVariantName` property.
   */
  availableVariations: SkuVariantsByName
  /**
   * SKU property values for the current SKU.
   */
  activeVariations: Record<string, string>
}

function Selectors({
  slugsMap,
  availableVariations,
  activeVariations,
  ...otherProps
}: Props) {
  const router = useRouter()
  /**
   * Name of the property that's considered **dominant**. Which means that all
   * other varying properties will be filtered according to the current value
   * of this property.
   *
   * Ex: If `Red` is the current value for the 'Color' variation, we'll only
   * render possible values for 'Size' that are available in `Red`.
   */
  const DOMINANT_SKU_SELECTOR_PROPERTY =
    Object.keys(availableVariations)[0] ?? 'Cor'

  // 'Color' variants are singled-out here because they will always be rendered
  // as 'image' variants. And they're also the 'dominant' variants in our store.
  const { Cor: colorOptions, ...otherSkuVariants } = availableVariations

  function handleOnChange(
    e: ChangeEvent<HTMLInputElement>,
    updatedVariationName: string
  ) {
    const newVariationValue = e.currentTarget.value

    navigateToSku({
      router,
      slugsMap,
      updatedVariationName,
      selectorsState: activeVariations,
      updatedVariationValue: newVariationValue,
      dominantSku: DOMINANT_SKU_SELECTOR_PROPERTY,
    })
  }

  return (
    <section {...otherProps}>
      {colorOptions && (
        <SkuSelector
          label="Cor"
          variant="image"
          options={colorOptions}
          activeValue={activeVariations.Cor}
          onChange={(e) => handleOnChange(e, 'Cor')}
        />
      )}
      {otherSkuVariants &&
        Object.keys(otherSkuVariants).map((skuVariant) => (
          <SkuSelector
            variant="label"
            key={skuVariant}
            label={skuVariant}
            options={otherSkuVariants[skuVariant]}
            activeValue={activeVariations[skuVariant]}
            onChange={(e) => handleOnChange(e, skuVariant)}
          />
        ))}
    </section>
  )
}

export default Selectors
