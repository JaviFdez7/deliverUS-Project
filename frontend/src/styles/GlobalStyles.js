const brandPrimary = '#50B2C0' // color agua aoscuro
const brandPrimaryDisabled = `${brandPrimary}a8`
const brandPrimaryTap = '#0F4D43' //  azul más oscuro
const brandSecondary = '#201E1F' //  casi Negro
const brandSecondaryTap = '#EAB607' // amarillo US más oscuro
const brandSuccess = '#95be05' // verde US
const brandBackground = '#E5EEED' // azul muy claro fondo
const flashStyle = { paddingTop: 50, fontSize: 20 }
const flashTextStyle = { fontSize: 18 }

const navigationTheme = {
  dark: false,
  colors: {
    primary: brandSecondary,
    background: brandBackground,
    card: brandPrimary,
    text: '#ffffff',
    border: `${brandPrimary}99`,
    notification: `${brandSecondaryTap}ff` // badge
  }
}

export { navigationTheme, brandPrimary, brandPrimaryTap, brandSecondary, brandSecondaryTap, brandSuccess, brandBackground, flashStyle, flashTextStyle, brandPrimaryDisabled }
