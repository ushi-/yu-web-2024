import {
  Card,
  CardContentContainer,
  CardPrimaryContent,
  CardPrimaryContentContainer,
  CardSecondaryContent,
} from "@/components/ui/card";

const Footer = () => (
  <footer>
    <Card>
      <CardContentContainer>
        <CardPrimaryContentContainer>
          <CardPrimaryContent className="text-muted-foreground">
            © Yosuke Ushigome
          </CardPrimaryContent>
          <CardPrimaryContent />
        </CardPrimaryContentContainer>
      </CardContentContainer>
      <CardSecondaryContent />
    </Card>
  </footer>
);

export default Footer;
