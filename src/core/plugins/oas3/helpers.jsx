import React from "react"

export function isOAS3(jsSpec) {
  const oasVersion = jsSpec.get("openapi")
  if(typeof oasVersion !== "string") {
    return false
  }

  return oasVersion.startsWith("3.") && oasVersion.length > 4
}

export function isSwagger2(jsSpec) {
  const swaggerVersion = jsSpec.get("swagger")
  if(typeof swaggerVersion !== "string") {
    return false
  }

  return swaggerVersion.startsWith("2.0")
}

export function OAS3ComponentWrapFactory(Component) {
  return (Ori, system) => (props) => {
    if(system && system.specSelectors && system.specSelectors.specJson) {
      const spec = system.specSelectors.specJson()

      if(isOAS3(spec)) {
        return <Component {...props} {...system} Ori={Ori}></Component>
      } else {
        return <Ori {...props}></Ori>
      }
    } else {
      console.warn("OAS3 wrapper: couldn't get spec")
      return null
    }
  }
}
