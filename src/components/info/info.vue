<template>
    <div>
        <div class="segment-header">
            <i class="material-icons ml-2">contact_support</i>
            <p>Informasjon</p>
        </div>
        <div class="info-wrapper">
        <p>Som bruker av denne applikasjonen er du med på et forskningsprosjekt i forbindelse med en masteroppgave av to studenter ved Høyskolen Kristiania. Vi tester produktet, ikke brukerne.
            <br><br>Hvis du er deltaker fordi du er ansatt et sted, så minner vi om at det er viktig at du forsøker å unngå å diskutere forskningsprosjektet eller Fellow med kolleger før vi avslutter 25.05.20.
            <br><br>Tusen takk for at du er med!
        </p>
        <p>Kontakt oss her: <a href="mailto:c3masterprosjekt@gmail.com">c3masterprosjekt@gmail.com</a> om du har noen spørsmål!<br><br>- Oda & Changiz</p>
        </div>
    </div>
</template>

<style scoped>
    .info-wrapper{
        width: 70%;
        margin: auto;
        margin-top: 7em;
    }

    .segment-header {
        top: 0;
        width: 100%;
        color: #fff;
        background: #3D3D3D;
        height: 4em;
        display: flex;
        align-items: center;
        position: fixed;
        z-index: 2;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    }
    .segment-header p {
        flex-grow: 3;
        font-size: large;
        margin: auto auto auto 10px;
        z-index: 2;
        width: 70%;
    }
    .info-wrapper p {
        color: #ffffff;
        opacity: 0.8;
    }
</style>