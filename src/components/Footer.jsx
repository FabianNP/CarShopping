import "./Footer.css"

export function Footer ({ filters }) {
  return (
    <footer className="footer">
      {
        JSON.stringify(filters, null, 2)
      }

      {/* <h4>Prueba tecnica de React * 
      <span>FabianNP</span></h4>
      <h5>Shopping Cart con useContext & use Reducer</h5> */}
    </footer>
  )
}