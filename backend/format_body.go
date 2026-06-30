package wordformat

import (
	"github.com/unidoc/unioffice/color"
	"github.com/unidoc/unioffice/document"
	"github.com/unidoc/unioffice/measurement"
	"github.com/unidoc/unioffice/schema/soo/wml"
)

func applyStyleToRun(r document.Run, s *BodyStyle) {
	rPr := r.Properties()
	if s.ENFont != "" || s.CNFont != "" {
		font := s.ENFont
		if font == "" {
			font = s.CNFont
		}
		rPr.SetFontFamily(font)
		if s.CNFont != "" && s.CNFont != s.ENFont {
			cn := s.CNFont
			rPr.X().RFonts.EastAsiaAttr = &cn
		}
	}
	if s.SizeCN != "" {
		rPr.SetSize(cnSizeToHalfPoints(s.SizeCN) * measurement.HalfPoint)
	}
	if s.Bold {
		rPr.SetBold(true)
	}
	if s.Italic {
		rPr.SetItalic(true)
	}
	if s.Underline {
		rPr.SetUnderline(wml.ST_UnderlineSingle, color.FromHex("#000000"))
	}
	if s.Color != "" {
		rPr.SetColor(colorFromHex(s.Color))
	}
}

func applyParagraphSpacing(p document.Paragraph, s *BodyStyle) {
	if s.LineSpacingMode != "" {
		p.SetLineSpacing(
			twipsFromLineSpacing(s.LineSpacingMode, s.LineSpacingValue)*measurement.Twips,
			lineSpacingEnum(s.LineSpacingMode))
	}
	if s.SpaceBeforeValue > 0 || s.SpaceBeforeUnit != "" {
		p.SetBeforeSpacing(twipsFromSpacing(s.SpaceBeforeValue, s.SpaceBeforeUnit) * measurement.Twips)
	}
	if s.SpaceAfterValue > 0 || s.SpaceAfterUnit != "" {
		p.SetAfterSpacing(twipsFromSpacing(s.SpaceAfterValue, s.SpaceAfterUnit) * measurement.Twips)
	}
	if s.FirstLineIndentChars > 0 {
		p.SetFirstLineIndent(measurement.Distance(s.FirstLineIndentChars*200) * measurement.Twips)
	}
	if s.LeftIndentValue > 0 {
		p.SetLeftIndent(twipsFromIndentValue(s.LeftIndentValue, s.LeftIndentUnit) * measurement.Twips)
	}
	if s.RightIndentValue > 0 {
		p.SetRightIndent(twipsFromIndentValue(s.RightIndentValue, s.RightIndentUnit) * measurement.Twips)
	}
}

func ApplyBodyFormat(doc *document.Document, s *BodyStyle) error {
	for _, p := range doc.Paragraphs() {
		styleID := p.Style()
		if isHeading(styleID) {
			continue
		}

		if s.Align != "" {
			p.SetAlignment(alignFromString(s.Align))
		}

		applyParagraphSpacing(p, s)

		for _, r := range p.Runs() {
			applyStyleToRun(r, s)
		}
	}
	return nil
}

func isHeading(styleID string) bool {
	return matchHeadingLevel(styleID) > 0 || (len(styleID) >= 3 && styleID[:3] == "TOC")
}
