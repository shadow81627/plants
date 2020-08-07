export default ({ $vuetify, $warehouse }) => {
  $vuetify.theme.dark = $warehouse.get('dark')
}
