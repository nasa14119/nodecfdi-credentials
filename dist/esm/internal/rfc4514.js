export default class Rfc4514 {
    static LeadChars = [' ', '#'];
    static LeadReplacements = [String.raw `\20`, String.raw `\22`];
    static TrailChars = [' '];
    static TrailReplacements = [String.raw `\20`];
    static InnerChars = [/\\/g, /"/g, /\+/g, /,/g, /;/g, /</g, /=/g, />/g];
    static InnerReplacements = [
        String.raw `\5C`,
        String.raw `\22`,
        String.raw `\2b`,
        String.raw `\2c`,
        String.raw `\3b`,
        String.raw `\3c`,
        String.raw `\3d`,
        String.raw `\3e`,
    ];
    escape(targetSubject) {
        let subject = targetSubject;
        let prefix = '';
        let suffix = '';
        const stringReplace = (search, replace, target) => {
            let fixedTarget = target;
            for (const [index, from] of search.entries()) {
                fixedTarget = fixedTarget.replace(from, replace[index]);
            }
            return fixedTarget;
        };
        const firstChar = subject.slice(0, 1);
        if (Rfc4514.LeadChars.includes(firstChar)) {
            prefix = stringReplace(Rfc4514.LeadChars, Rfc4514.LeadReplacements, firstChar);
            subject = subject.slice(1);
        }
        const lastChar = subject.slice(-1);
        if (Rfc4514.TrailChars.includes(lastChar)) {
            suffix = stringReplace(Rfc4514.TrailChars, Rfc4514.TrailReplacements, lastChar);
            subject = subject.slice(0, -1);
        }
        return `${prefix}${stringReplace(Rfc4514.InnerChars, Rfc4514.InnerReplacements, subject)}${suffix}`;
    }
    escapeRecord(values) {
        return Object.entries(values)
            .map(([name, value]) => `${this.escape(name)}=${this.escape(value)}`)
            .join(',');
    }
}
