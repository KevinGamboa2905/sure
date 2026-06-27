import { Html, Head, Preview, Body, Container, Section, Text, Hr } from "@react-email/components";
import type { CSSProperties, ReactNode } from "react";

export const styles: Record<string, CSSProperties> = {
  body: { backgroundColor: "#fffee7", margin: 0, padding: "28px 16px", fontFamily: "Helvetica, Arial, sans-serif", color: "#000000" },
  container: { maxWidth: "480px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "18px", border: "1px solid rgba(188,188,188,0.45)", overflow: "hidden" },
  inner: { padding: "32px" },
  brand: { fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em", color: "#000000", margin: 0 },
  brandDot: { color: "#000", borderBottom: "3px solid #fcf376" },
  heading: { fontSize: "24px", fontWeight: 700, letterSpacing: "-0.02em", color: "#000000", margin: "20px 0 8px" },
  text: { fontSize: "15px", lineHeight: "1.6", color: "#555553", margin: "0 0 14px" },
  button: { display: "inline-block", backgroundColor: "#fcf376", color: "#000000", fontWeight: 700, fontSize: "14px", textDecoration: "none", padding: "13px 22px", borderRadius: "999px" },
  card: { backgroundColor: "rgba(255,254,231,0.6)", border: "1px solid rgba(188,188,188,0.4)", borderRadius: "14px", padding: "16px 18px", margin: "8px 0 18px" },
  row: { fontSize: "14px", color: "#000000", margin: "4px 0" },
  hr: { borderColor: "rgba(188,188,188,0.4)", margin: "24px 0" },
  footer: { fontSize: "12px", color: "#9a978f", margin: 0 },
};

export function EmailLayout({ preview, children }: { preview: string; children: ReactNode }) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={{ ...styles.inner, paddingBottom: 0 }}>
            <Text style={styles.brand}>Tab<span style={styles.brandDot}>ly</span></Text>
          </Section>
          <Section style={styles.inner}>{children}</Section>
          <Hr style={styles.hr} />
          <Section style={{ padding: "0 32px 28px" }}>
            <Text style={styles.footer}>Tably · L&apos;anti no-show des restaurants de Suisse romande.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
