exports.handler = (event, context, callback) => {
    const map = [
        { name: "Alanine", abbr: "Ala", codons: ["GCT","GCC","GCA","GCG"] },
        { name: "Arginine", abbr: "Arg", codons: ["CGT","CGC","CGA","CGG","AGA","AGG"] },
        { name: "Asparagine", abbr: "Asn", codons: ["AAT","AAC"] },
        { name: "Aspartic acid", abbr: "Asp", codons: ["GAT","GAC"] },
        { name: "Cysteine", abbr: "Cys", codons: ["TGT","TGC"] },
        { name: "Glutamine", abbr: "Gln", codons: ["CAA","CAG"] },
        { name: "Glutamic acid", abbr: "Glu", codons: ["GAA","GAG"] },
        { name: "Glycine", abbr: "Gly", codons: ["GGT","GGC","GGA","GGG"] },
        { name: "Histidine", abbr: "His", codons: ["CAT","CAC"] },
        { name: "Isoleucine", abbr: "Ile", codons: ["ATT","ATC","ATA"] },
        { name: "Leucine", abbr: "Leu", codons: ["CTT","CTC","CTA","CTG","TTA","TTG"] },
        { name: "Lysine", abbr: "Lys", codons: ["AAA","AAG"] },
        { name: "Methionine", abbr: "Met", codons: ["ATG"] },
        { name: "Phenylalanine", abbr: "Phe", codons: ["TTT","TTC"] },
        { name: "Proline", abbr: "Pro", codons: ["CCT","CCC","CCA","CCG"] },
        { name: "Pyrrolysine", abbr: "Pyl", codons: [] },
        { name: "Serine", abbr: "Ser", codons: ["TCT","TCC","TCA","TCG","AGT","AGC"] },
        { name: "Selenocysteine", abbr: "Sec", codons: [] },
        { name: "Threonine", abbr: "Thr", codons: ["ACT","ACC","ACA","ACG"] },
        { name: "Tryptophan", abbr: "Trp", codons: ["TGG"] },
        { name: "Tyrosine", abbr: "Tyr", codons: ["TAT","TAC"] },
        { name: "Valine", abbr: "Val", codons: ["GTT","GTC","GTA","GTG"] }
    ]

    callback(null, {
        statusCode: 200,
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(map)
    })
}