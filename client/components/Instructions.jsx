import React, {PropTypes} from 'react'

const Instructions = ({ dismissInstructions }) => (
    <div className="instructions">
        <article>
            <h1>Ohjeet</h1>
            <i className="fa fa-times" aria-hidden="true" onClick={dismissInstructions}></i>
            <p>Luo uusi kauppalista painamalla keskellä olevaa nappia "Luo uusi lista". Tällöin sinut ohjataan uudelle sivulle, jossa aukeaa uusi kauppalistasi. Pääset käyttämään listaasi myös myöhemmin siirtymällä kauppalistan URLiin.</p>
            <p>Lisää uusi tavara kauppalistaan täyttämällä sen nimi ja painamalla "Lisää"-nappia.</p>
            <p>Voit muokata listassa olevaa tavaroa painamalla kynän kuvaa.</p>
            <p>Voit poistaa listassa olevan tavaran painamalla roskakorin kuvaa.</p>
            <p>Voit merkata listassa olevan tavaran ostetuksi painamalla oikeinmerkkiä. Kun painat "Kauppareissu päättynyt"-painiketta, listasta poistetaan kaikki ostetuksi merkatut tavarat.</p>
        </article>
    </div>
)

Instructions.propTypes = {
    dismissInstructions: PropTypes.func.isRequired
}

export default Instructions
