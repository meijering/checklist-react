import React, { useState } from 'react';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { media } from '../utils/media';

const Content = styled.div`
  max-width: 1000px;
  margin: 5px auto;
  font-family: sans-serif;
`;

const Toolbar = styled.div`
  max-width: 1000px;
  margin: 5px auto;
  font-family: sans-serif;
  width: calc(100% - 5px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const A = styled.a`
  cursor: pointer;
  display: block;
  text-align: right;
  max-width: 1000px;
  margin: 20px auto;
  font-family: sans-serif;
`;
const Footer = styled.div`
  position: absolute;
  width: 100%;
  bottom:0;
  background-color: rgba(255, 255, 255, 0.6);
  ${media.phone`
    width: calc(100% - 20px);
    padding-right: 20px;
  `}`;

const Title = styled.div`
  display: flex;
  margin-top: 2px;
  align-items: center;
  font-variant: small-caps;
  font-size: 25px;
  font-family: sans-serif;
  ${media.phone`
    font-size: 15px;
    padding-left: 20px;
  `}
`;

const List = styled.ol`
  margin-top: 100px;
  padding-left: 20px;
  margin-left: 0;
  & li {
    padding-top:20px;
  }
  ${media.phone`
    padding-left: 40px;
    padding-right: 40px;
  `}
`;
const Foot = styled.div`
  padding: 20px 0px 20px 20px;
  & a {
    margin-left: 0.5em;
  }
`;

const Privacy: React.FC = () => {
  const [openPrivacy, setOpenPrivacy] = useState(false);

  const handleClickOpen = () => {
    setOpenPrivacy(true);
  };

  const handleClose = () => {
    setOpenPrivacy(false);
  };

  return (
    <React.Fragment>
      <Footer>
        <A onClick={handleClickOpen}>
          Privacyverklaring
        </A>
      </Footer>
      <Dialog
        fullScreen
        open={openPrivacy}
        onClose={handleClose}
        aria-labelledby="register"
      >
        <AppBar>
          <Toolbar>
            <Title id="register">Privacy statement en cookie beleid van de Groene Giraf</Title>
            <IconButton color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Content>
          <List>
            <li>
              <strong>Waarborgen Privacy</strong>
              <br />
              Het waarborgen van de privacy van bezoekers van deGroeneGiraf.nl en de online
              Duurzaamheid checklist van de Groene Giraf is een belangrijke taak voor ons.
              Daarom beschrijven we in onze privacy policy welke informatie we verzamelen en
              hoe we deze informatie gebruiken.
            </li>
            <li>
              <strong>Toestemming</strong>
              <br />
              Door de informatie en de diensten op deGroeneGiraf.nl en de online Duurzaamheid
              checklist van de Groene Giraf te gebruiken, gaat u akkoord met onze privacy policy
              en de voorwaarden die wij hierin hebben opgenomen. De verkregen informatie wordt
              niet met derden gedeeld en wordt alleen geanonimiseerd gebruikt.
            </li>
            <li>
              <strong>Vragen</strong>
              <br />
              Als u meer informatie wilt ontvangen, of vragen hebt over de privacy policy van
              deGroeneGiraf.nl en de online Duurzaamheid checklist van de Groene Giraf kun u ons
              benaderen via e-mail.
              <br />
              Ons e-mailadres is
              <a href="mailto:info@degroenegiraf.nl">info@degroenegiraf.nl</a>
            </li>
            <li>
              <strong>Monitoren gedrag bezoeker</strong>
              <br />
              DeGroeneGiraf.nl en de online Duurzaamheid checklist van de Groene Giraf maken gebruik
              van verschillende technieken om bij te houden wie de website en de online Duurzaamheid
              checklist bezoekt en hoe deze bezoeker zich op de website gedraagt en welke pagina’s
              worden bezocht. Dat is een gebruikelijke manier van werken voor websites omdat het
              informatie oplevert die bijdraagt aan de kwaliteit van de gebruikerservaring. De
              informatie die we via cookies registreren bestaat uit onder meer IP-adressen, het type
              browser en de bezochte pagina’s.
              Tevens monitoren we waar bezoekers de website voor het eerst bezoeken en vanaf welke
              pagina ze vertrekken. Deze informatie houden we anoniem bij en is niet gekoppeld aan
              andere persoonlijke informatie.
            </li>
            <li>
              <strong>Gebruik van cookies</strong>
              <br />
              deGroeneGiraf.nl plaatst cookies bij bezoekers. Dat doen we om informatie te
              verzamelen over de pagina’s die gebruikers op onze website en de online Duurzaamheid
              checklist bezoeken, om bij te houden hoe vaak bezoekers terug komen en om te zien
              welke pagina’s het goed doen op de website en de online Duurzaamheid checklist van
              de Groene Giraf.
              Ook houden we bij welke informatie de browser deelt.
            </li>
            <li>
              <strong>Cookies uitschakelen</strong>
              <br />
              U kunt er voor kiezen om cookies uit te schakelen. Dat doet u door gebruik te maken
              van de mogelijkheden van uw browser. U vindt meer informatie over deze mogelijkheden
              op de website van de aanbieder van uw browser.
            </li>
          </List>
          <Foot>
            Deze privacy policy is gegenereerd door
            <a href="https://privacypolicyvoorbeeld.nl" target="_blank" rel="noreferrer">privacypolicyvoorbeeld.nl</a>
          </Foot>
        </Content>
      </Dialog>
    </React.Fragment>
  );
};

export default Privacy;
