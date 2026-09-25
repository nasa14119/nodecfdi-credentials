export default class Rfc4514 {
    static readonly LeadChars: string[];
    static readonly LeadReplacements: string[];
    static readonly TrailChars: string[];
    static readonly TrailReplacements: string[];
    static readonly InnerChars: RegExp[];
    static readonly InnerReplacements: string[];
    escape(targetSubject: string): string;
    escapeRecord(values: Record<string, string>): string;
}
