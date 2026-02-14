// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// Creating factory function

const pAequorFactory = (id, dnaBasesArray) => {
    return {
        _specimenNum: id,
        _dna: dnaBasesArray,
        get specimenNum() {return this._specimenNum},
        get dna() {return this._dna},
        // method to mutate a single base
        mutate() {
            const dnaBases = ['A', 'T', 'C', 'G']
            let randomIndex = Math.floor(Math.random() * this.dna.length);
            let dnaBase = this.dna[randomIndex];
            let newDnaBase = '';
            do {newDnaBase = dnaBases[Math.floor(Math.random() * 4)]} while (newDnaBase === dnaBase);
            let newBasesArray = this._dna.slice()
            newBasesArray[randomIndex] = newDnaBase;
            this._dna = newBasesArray;
        },
        // methods to compare the DNA of this instance to another instance
        compareDNA(pAequor) {
            compID = pAequor.specimenNum;
            compDNA = pAequor.dna;
            numMatches = 0;
            for (i = 0; i < compDNA.length; i++) {
                if (compDNA[i] === this._dna[i]) {
                    numMatches ++
                }
            }
            return `${compID} and ${this._specimenNum} have ${(numMatches / this._dna.length * 100).toFixed(2)}% matching DNA`;
        },
        compareDNAMatches(pAequor) {
            compID = pAequor.specimenNum;
            compDNA = pAequor.dna;
            numMatches = 0;
            for (i = 0; i < compDNA.length; i++) {
                if (compDNA[i] === this._dna[i]) {
                    numMatches ++
                }
            }
            return numMatches;
        },
        // method to calculate likelihood of survival of this instance
        willLikelySurvive() {
            let numCG = 0;
            for (i = 0; i < this._dna.length; i++) {
                if (this._dna[i] === 'C' || this._dna[i] === 'G') {
                    numCG ++
                }
            }
            if ((numCG / this._dna.length * 100) >= 60) {
                return true;
            } else {
                return false;
            }
        },
        // returns the complementary strand (A = T, T = A, etc)
        complementaryStrand() {
            let complementaryStrand = [];
            this._dna.forEach((char) => {
                switch (char) {
                    case 'A':
                        complementaryStrand.push('T');
                        break;
                    case 'T':
                        complementaryStrand.push('A');
                        break;
                    case 'C':
                        complementaryStrand.push('G');
                        break;
                    case 'G':
                        complementaryStrand.push('C');
                        break;
                }
            });
            return complementaryStrand;
        }
    }
}

// create 30 survivable instances
let survivableInstance = [];
for (let i = 0; i < 30; i++) {
    let temp;
    do {
        temp = pAequorFactory(i, mockUpStrand());
    } while (temp.willLikelySurvive() !== true);
    survivableInstance.push(temp);
}

// finding the closest related instances from the array of 30
let bestMatches =[];
let highestMatch = 0;

for (let i = 0; i < survivableInstance.length; i++) {
    for (let j = i+1; j < survivableInstance.length; j++) {
        let match = survivableInstance[i].compareDNAMatches(survivableInstance[j]);
        if (match > highestMatch) {
            highestMatch = match;
            bestMatches = [[survivableInstance[i].specimenNum, survivableInstance[j].specimenNum]];
        } else if (match === highestMatch) {
            bestMatches.push([survivableInstance[i].specimenNum, survivableInstance[j].specimenNum]);
        }
    }
}