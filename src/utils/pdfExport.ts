import { jsPDF } from 'jspdf';
import { GeneratedAdBrief } from '../engine/adGenerator';

export function exportBriefToPDF(brief: GeneratedAdBrief): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let currentY = margin;

  // Helper: check page break
  const checkAddPage = (neededSpace: number) => {
    if (currentY + neededSpace > pageHeight - 16) {
      doc.addPage();
      currentY = 16;
      drawHeaderMini();
    }
  };

  // Mini header on subsequent pages
  const drawHeaderMini = () => {
    doc.setFillColor(15, 17, 26);
    doc.rect(0, 0, pageWidth, 10, 'F');
    doc.setFillColor(139, 92, 246);
    doc.rect(0, 10, pageWidth, 0.8, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text('AVEON AD STUDIO // CREATIVE BRIEF', margin, 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(161, 161, 170);
    doc.text(`Campaign: ${brief.title.slice(0, 45)} • ID: ${brief.id}`, pageWidth - margin, 6.5, { align: 'right' });

    currentY = 15;
  };

  // ----------------------------------------------------
  // COVER / TOP HERO BANNER (Page 1)
  // ----------------------------------------------------
  doc.setFillColor(13, 14, 20); // Dark sleek background
  doc.rect(0, 0, pageWidth, 32, 'F');

  // Violet gradient accent bar
  doc.setFillColor(139, 92, 246);
  doc.rect(0, 32, pageWidth, 1.5, 'F');

  // AVEON Logo & Monogram
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('AVEON', margin, 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(168, 85, 247);
  doc.text('STORYTELLING × AI × DISTRIBUTION', margin + 28, 12.8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(244, 244, 245);
  doc.text('PERFORMANCE CREATIVE AD BRIEF', margin, 22);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(161, 161, 170);
  doc.text(`Generated: ${brief.generatedAt} | ID: ${brief.id}`, margin, 27);

  // Status Badge right aligned
  doc.setFillColor(88, 28, 135);
  doc.roundedRect(pageWidth - margin - 32, 10, 32, 7, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(243, 232, 255);
  doc.text('READY TO SHOOT', pageWidth - margin - 16, 14.8, { align: 'center' });

  currentY = 38;

  // ----------------------------------------------------
  // CAMPAIGN OVERVIEW METRICS CARD
  // ----------------------------------------------------
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, currentY, contentWidth, 26, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(brief.title, margin + 4, currentY + 6);

  // Meta row
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Brand:`, margin + 4, currentY + 12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${brief.input.brandName || 'AVEON Client'}`, margin + 16, currentY + 12);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Category:`, margin + 55, currentY + 12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${brief.input.category}`, margin + 70, currentY + 12);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Format & Tone:`, margin + 115, currentY + 12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(109, 40, 217);
  doc.text(`${brief.input.tone}`, margin + 138, currentY + 12);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Target Audience:`, margin + 4, currentY + 18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  const audLines = doc.splitTextToSize(brief.input.targetAudience, contentWidth - 32);
  doc.text(audLines[0] || '', margin + 28, currentY + 18);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Core Mechanism:`, margin + 4, currentY + 23);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  const mechLines = doc.splitTextToSize(brief.input.uniqueMechanism, contentWidth - 32);
  doc.text(mechLines[0] || '', margin + 29, currentY + 23);

  currentY += 30;

  // ----------------------------------------------------
  // SECTION 1: CREATIVE STRATEGY & PSYCHOLOGY
  // ----------------------------------------------------
  checkAddPage(28);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(109, 40, 217);
  doc.text('1. CREATIVE STRATEGY & PSYCHOLOGY', margin, currentY);

  currentY += 3;
  doc.setFillColor(245, 243, 255);
  doc.setDrawColor(221, 214, 254);

  const hypoLines = doc.splitTextToSize(brief.creativeHypothesis, contentWidth - 8);
  const boxHeight = hypoLines.length * 4.2 + 8;
  doc.roundedRect(margin, currentY, contentWidth, boxHeight, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(124, 58, 237);
  const triggerTag = brief.psychologyProfile?.tag ? ` (${brief.psychologyProfile.tag})` : '';
  const triggerName = (brief.psychologyProfile?.name || 'PERFORMANCE PSYCHOLOGY').toUpperCase();
  doc.text(`TRIGGER ANGLE: ${triggerName}${triggerTag}`, margin + 4, currentY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(hypoLines, margin + 4, currentY + 10);

  currentY += boxHeight + 6;

  // ----------------------------------------------------
  // SECTION 2: TESTED HOOK VARIATIONS (0:00 - 0:03)
  // ----------------------------------------------------
  checkAddPage(20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(109, 40, 217);
  doc.text('2. TESTED HOOK VARIATIONS (FIRST 3 SECONDS)', margin, currentY);
  currentY += 4;

  brief.hooks.forEach((hook) => {
    const spokenLines = doc.splitTextToSize(`"${hook.hookScript}"`, contentWidth - 28);
    const cueLines = doc.splitTextToSize(hook.visualCue, contentWidth - 28);
    const cardHeight = spokenLines.length * 4 + cueLines.length * 3.8 + 17;

    checkAddPage(cardHeight + 2);

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, currentY, contentWidth, cardHeight, 1.5, 1.5, 'FD');

    // Hook number pill
    doc.setFillColor(15, 23, 42);
    doc.roundedRect(margin + 3, currentY + 3, 16, 5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text(`HOOK 0${hook.id}`, margin + 11, currentY + 6.5, { align: 'center' });

    // Archetype
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(hook.archetype, margin + 22, currentY + 6.8);

    // Retention Bump badge
    doc.setFillColor(236, 253, 245);
    doc.setDrawColor(167, 243, 208);
    doc.roundedRect(pageWidth - margin - 26, currentY + 3, 23, 5, 1, 1, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(5, 150, 105);
    doc.text(hook.estimatedRetentionBump, pageWidth - margin - 14.5, currentY + 6.5, { align: 'center' });

    let hookY = currentY + 11;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Spoken:', margin + 4, hookY);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(spokenLines, margin + 18, hookY);
    hookY += spokenLines.length * 4 + 1;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Visual Cue:', margin + 4, hookY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(cueLines, margin + 20, hookY);
    hookY += cueLines.length * 3.8 + 1;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(124, 58, 237);
    doc.text(`Overlay: [ ${hook.onScreenText} ]`, margin + 4, hookY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(`SFX: ${hook.audioSFX}`, margin + 95, hookY);

    currentY += cardHeight + 3;
  });

  currentY += 4;

  // ----------------------------------------------------
  // SECTION 3: 60-SECOND STORYBOARD & SCRIPT BEATS
  // ----------------------------------------------------
  checkAddPage(20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(109, 40, 217);
  doc.text('3. FULL 60-SECOND STORYBOARD & SCRIPT', margin, currentY);
  currentY += 4;

  brief.scriptBeats.forEach((beat) => {
    const dialogueLines = doc.splitTextToSize(`"${beat.dialogue}"`, contentWidth - 28);
    const visualLines = doc.splitTextToSize(beat.visualDirection, contentWidth - 28);
    const psychLines = doc.splitTextToSize(beat.psychologyNote, contentWidth - 28);
    const beatHeight = dialogueLines.length * 3.8 + visualLines.length * 3.6 + psychLines.length * 3.4 + 14;

    checkAddPage(beatHeight + 2);

    doc.setFillColor(250, 250, 250);
    doc.setDrawColor(228, 228, 231);
    doc.roundedRect(margin, currentY, contentWidth, beatHeight, 1.5, 1.5, 'FD');

    // Timestamp pill
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin + 3, currentY + 3, 22, 4.8, 1, 1, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);
    doc.text(beat.timestamp, margin + 14, currentY + 6.3, { align: 'center' });

    // Beat Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(beat.beatName, margin + 28, currentY + 6.5);

    let beatY = currentY + 11;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Dialogue:', margin + 4, beatY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(dialogueLines, margin + 19, beatY);
    beatY += dialogueLines.length * 3.8 + 1;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Visuals:', margin + 4, beatY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(visualLines, margin + 18, beatY);
    beatY += visualLines.length * 3.6 + 1;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(124, 58, 237);
    doc.text('Psychology:', margin + 4, beatY);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(109, 40, 217);
    doc.text(psychLines, margin + 20, beatY);

    currentY += beatHeight + 3;
  });

  currentY += 4;

  // ----------------------------------------------------
  // SECTION 4: CALL TO ACTION (CTA) & RISK REVERSAL
  // ----------------------------------------------------
  checkAddPage(32);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(109, 40, 217);
  doc.text('4. CALL-TO-ACTION & OFFER CONVERSION', margin, currentY);
  currentY += 4;

  const ctaLines = doc.splitTextToSize(`"${brief.ctaOffer.dialogue}"`, contentWidth - 8);
  const ctaHeight = ctaLines.length * 4 + 18;

  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(margin, currentY, contentWidth, ctaHeight, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(220, 38, 38);
  doc.text('CONVERSION DIRECTIVE', margin + 4, currentY + 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text(ctaLines, margin + 4, currentY + 10);

  const ctaSubY = currentY + 10 + ctaLines.length * 4 + 1;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(185, 28, 28);
  doc.text(`Overlay Badge: [ ${brief.ctaOffer.onScreenOverlay} ]`, margin + 4, ctaSubY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Guarantee / Risk Reversal: ${brief.ctaOffer.riskReversal}`, margin + 4, ctaSubY + 4.5);

  currentY += ctaHeight + 6;

  // ----------------------------------------------------
  // SECTION 5: VIDEO EDITOR SOP CHECKLIST
  // ----------------------------------------------------
  checkAddPage(brief.editorChecklist.length * 5 + 16);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(109, 40, 217);
  doc.text('5. VIDEO EDITOR SOP GUIDELINES', margin, currentY);
  currentY += 4;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  const checklistHeight = brief.editorChecklist.length * 5.2 + 6;
  doc.roundedRect(margin, currentY, contentWidth, checklistHeight, 1.5, 1.5, 'FD');

  let checkY = currentY + 5;
  brief.editorChecklist.forEach((item) => {
    doc.setDrawColor(100, 116, 139);
    doc.rect(margin + 4, checkY - 2.8, 3, 3);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 41, 59);
    doc.text(item, margin + 9, checkY);
    checkY += 5.2;
  });

  // ----------------------------------------------------
  // GLOBAL FOOTERS ON ALL PAGES
  // ----------------------------------------------------
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Subtle divider
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, pageHeight - 11, pageWidth - margin, pageHeight - 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text('AVEON Ad Studio • Storytelling × AI × Distribution • Confidential', margin, pageHeight - 7);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 116, 139);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 7, { align: 'right' });
  }

  // Trigger download
  const safeFilename = (brief.title || 'Brief')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 35);
  doc.save(`AVEON-Creative-Brief-${safeFilename}-${brief.id}.pdf`);
}
