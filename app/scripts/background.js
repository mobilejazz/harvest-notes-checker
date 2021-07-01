const Colors = {
    success : '#008000',
    emptyNote: '#FF0000',
    smallNote: '#FFA500',
    longTimerEntry: '#FFD700'
};

class HarvestNotesChecker {

    resultsBoxId = 'harvest-notes-checker';

    // Harvest Elements
    harvestSummaryElementId = 'dtr-summary';
    harvestEntryTimeSelector = 'tr.entry-has-notes td:last-child';
    harvestEntryNotesSelector = 'tr.entry-notes td:last-child p';
    harvestTableRowSelector = '#dtr-table tbody tr[data-record-id]';

    constructor() {
        window.addEventListener('load',() => {
            this.init();
        });
    }

    init() {
        this.initResultsBox();
        this.checkAndDisplay();
    }

    initResultsBox() {
        document.getElementById(this.harvestSummaryElementId)
            .insertAdjacentHTML('beforeend', `<div id="${this.resultsBoxId}" class="span-16"></div>`);
    }

    checkAndDisplay() {
        const longTimerEntries = this.checkForLongTimers();
        const smallNotes = this.checkForSmallNotes();
        const emptyNotes = this.checkForEmptyNotes();
        const results = ['<ul style="display: inline-block;">','</ul>'];

        if(!smallNotes && !emptyNotes &&!longTimerEntries){
            const messageElement = `<li><strong style="color:${Colors.success};">All good</strong></li>`;
            results.splice(-1, 0, messageElement);
        }
        if(emptyNotes){
            const messageElement = `<li><strong style="color:${Colors.emptyNote};">${emptyNotes} note${emptyNotes > 1 ?'s are':' is'} empty</strong></li>`;
            results.splice(-1, 0, messageElement);
        }
        if(smallNotes){
            const messageElement = `<li><strong style="color:${Colors.smallNote};">${smallNotes} note${smallNotes > 1 ?'s are':' is'} too short</strong></li>`;
            results.splice(-1,0,messageElement);
        }
        if(longTimerEntries){
            const messageElement =  `<li><strong style="color:${Colors.longTimerEntry};">${longTimerEntries} entr${longTimerEntries > 1 ?'ies are':'y is'} longer than 4h</strong></li>`;
            results.splice(-1,0,messageElement);
        }

        document
            .getElementById(this.resultsBoxId)
            .innerHTML = `<span style="margin-right: 15px;">Notes check</span>${results.join('')}`;
    };

    checkForSmallNotes() {
        var count = 0;
        document.querySelectorAll(this.harvestEntryNotesSelector).forEach((element) => {
            if(element.innerHTML.length <= 4 ){
                element.closest('tr').style.background = Colors.smallNote;
                element.closest('tr').previousElementSibling.style.background = Colors.smallNote;
                count++;
            }
        });
        return count;
    };

    checkForEmptyNotes() {
        var count = 0;

        document.querySelectorAll(this.harvestTableRowSelector).forEach((element) => {
            if(!element.classList.length) {
                element.style.background = Colors.emptyNote;
                count++;
            }
        });
        return count;
    };

    checkForLongTimers() {
        let count = 0;
        document.querySelectorAll(this.harvestEntryTimeSelector).forEach((element) => {
            if (parseFloat(element.innerHTML) >= 4.00){
                element.closest('tr').style.background = Colors.longTimerEntry;
                element.closest('tr').nextElementSibling.style.background = Colors.longTimerEntry;
                count++;
            }
        });
        return count;
    };

}

const app = new HarvestNotesChecker();
