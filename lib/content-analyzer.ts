interface ContentAnalysis {
  isProfane: boolean;
  isSuspicious: boolean;
  toxicityScore: number;
  reason?: string;
}

export class ContentAnalyzer {
  private static readonly PROFANITY_PATTERNS = {
    explicit:
      /\b(fuck|fucking|fucked|fucker|shit|shitting|ass|asshole|bitch|cunt|dick|pussy|whore|slut|bastard)\b/gi,

    masked:
      /f+[\W_]*u+[\W_]*c+[\W_]*k+|s+[\W_]*h+[\W_]*i+[\W_]*t+|b+[\W_]*i+[\W_]*t+[\W_]*c+[\W_]*h+/gi,

    leet: /f[u\*@]ck|sh[i\*@]t|b[i\*@]tch|@ss|p[u\*@]ssy/gi,

    spaces: /f\s*u\s*c\s*k|s\s*h\s*i\s*t|b\s*i\s*t\s*c\s*h/gi,

    common_variants:
      /f\*\*k|sh\*t|b\*tch|@ss|@sshole|d\*ck|p\*ssy|fk|fu|fuq|fuk|phuck|phuk/gi,

    offensive_words: /\b(idiot|stupid|retard|moron|dumb|loser|pathetic)\b/gi,

    racial_slurs: /\b(nigger|nigga|chink|spic|wetback|kike|faggot|dyke)\b/gi,

    aggressive: /\b(kill|die|murder|hate|destroy|attack)\b/gi,

    threats:
      /\b(threat|kill|murder|hurt|attack|die|death)\b.*\b(you|your|family|house|home)\b/gi,
  };

  private static readonly SUSPICIOUS_PATTERNS = {
    repetition: /(.)\1{4,}/, // Repeated characters

    allCaps: /^[A-Z\s!.?]{10,}$/, // All caps with length > 10

    excessivePunctuation: /[!?]{3,}/, // Multiple !!! or ???

    urls: /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))/gi,

    email_spam: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/gi,

    phone_numbers: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,

    excessive_numbers: /\d{10,}/,

    spam_keywords:
      /\b(viagra|cialis|crypto|bitcoin|forex|casino|lottery|prize|winner|inherited|million|dollars)\b/gi,

    suspicious_patterns:
      /\$\d+[k|m|b]|\d+\s*%\s*off|\b(free|win|won|bonus|discount|offer|limited|guarantee|guaranteed|congratulations)\b/gi,

    html_injection: /<[^>]*>|javascript:|onclick|onerror|onload/gi,

    sql_injection:
      /(\b(select|insert|update|delete|drop|union|exec|declare)\b.*\b(from|into|table|database)\b)|(-{2}|#{2}|\/\*|\*\/)/gi,
  };

  private static readonly TOXIC_INDICATORS = {
    aggressive_tone: /\b(fuck|fucking|fucked|shit|damn|hell|omg|wtf)\b/gi,

    excessive_negativity:
      /\b(hate|horrible|terrible|worst|sucks|garbage|trash|waste|useless)\b/gi,

    personal_attacks:
      /\b(you|your|ur)\b.*\b(stupid|idiot|dumb|pathetic|loser|suck|incompetent)\b/gi,

    condescending:
      /\b(obviously|clearly|apparently|duh|lmao|lol)\b.*\b(stupid|idiot|dumb)\b/gi,

    mockery:
      /\b(haha|lmao|lol|rofl|lmfao)\b.*\b(stupid|idiot|dumb|pathetic)\b/gi,
  };

  static analyze(content: string): ContentAnalysis {
    if (!content || typeof content !== "string") {
      console.log("Invalid content received:", content); // Debug log
      return {
        isProfane: false,
        isSuspicious: false,
        toxicityScore: 0,
        reason: "Invalid content",
      };
    }

    console.log("Analyzing content:", content); // Debug log

    const normalizedText = this.normalizeText(content);
    const profanityCheck = this.checkProfanity(normalizedText);

    console.log("Profanity check result:", profanityCheck); // Debug log

    const suspiciousCheck = this.checkSuspiciousContent(content);
    const toxicityScore = this.calculateToxicityScore(content);

    return {
      isProfane: profanityCheck.detected,
      isSuspicious: suspiciousCheck.suspicious,
      toxicityScore,
      reason: this.combineReasons(
        profanityCheck.reason,
        suspiciousCheck.reason
      ),
    };
  }

  private static normalizeText(text: string): string {
    return text.toLowerCase().trim();
  }

  private static checkProfanity(text: string) {
    const lowercaseText = text.toLowerCase();

    const directProfanity = /\b(fuck|shit|ass|bitch|cunt)\b/gi;
    if (directProfanity.test(lowercaseText)) {
      console.log("Direct profanity found:", text); // Debug log
      return { detected: true, reason: "Direct profanity detected" };
    }

    for (const [type, pattern] of Object.entries(this.PROFANITY_PATTERNS)) {
      if (pattern.test(lowercaseText)) {
        console.log(`${type} profanity found:`, text); // Debug log
        return { detected: true, reason: `Detected ${type} profanity` };
      }
    }

    return { detected: false, reason: "" };
  }

  private static checkSuspiciousContent(text: string) {
    let suspicious = false;
    let reason = "";

    for (const [type, pattern] of Object.entries(this.SUSPICIOUS_PATTERNS)) {
      if (pattern.test(text)) {
        suspicious = true;
        reason = `Suspicious ${type} pattern`;
        break;
      }
    }

    return { suspicious, reason };
  }

  private static calculateToxicityScore(text: string): number {
    let score = 0;

    // Basic checks
    if (text.length > 1000) score += 0.2;

    // Capitalization ratio
    const capsRatio = (text.match(/[A-Z]/g)?.length || 0) / text.length;
    if (capsRatio > 0.5) score += 0.3;

    // Punctuation density
    const punctRatio = (text.match(/[!?]/g)?.length || 0) / text.length;
    if (punctRatio > 0.1) score += 0.2;

    // Check toxic indicators
    for (const [type, pattern] of Object.entries(this.TOXIC_INDICATORS)) {
      if (pattern.test(text)) {
        score += 0.25;
      }
    }

    // Word repetition
    const words = text.toLowerCase().split(/\s+/);
    const uniqueWords = new Set(words);
    if (words.length > 10 && uniqueWords.size / words.length < 0.5) {
      score += 0.3;
    }

    return Math.min(score, 1);
  }

  private static combineReasons(...reasons: string[]): string {
    return reasons.filter(Boolean).join("; ");
  }
}
