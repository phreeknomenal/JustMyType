$(document).ready(() => {
    // Grab upper and lower keyboards.
    $upperKeys = $('#keyboard-upper-container');
    $lowerKeys = $('#keyboard-lower-container');

    // Set default: UPPER keys hidden, lower keys shown.
    $upperKeys.hide();
    $lowerKeys.show();

    // Sentences array
    let $sentences = ['ten ate'];

    // Set default sentence number & insert sentence into #sentence div.
    $sentenceNumber = 0;
    $('#sentence').text($sentences[$sentenceNumber]);

    // set character number, then get target letter of the sentence and insert into #target-letter div.
    $characterNumber = 0;
    $('#target-letter').text($sentences[$sentenceNumber].charAt($characterNumber));

    // Set default for correct keypresses
    $correctKeys = 0;
    // Set default for incorrect keypresses.
    $missedKeys = 0;


    // Event Listener
    $(document).on({
        // Key down functions are triggered when any key is pressed down, but before key is fully 'triggered'
        keydown: (e) => {
            let $pressKey = e.key;
            if ($pressKey === 'Shift') {
                // Show UPPERCASE keyboard
                $upperKeys.show();
                // Hide lowercase board
                $lowerKeys.hide();
            }

            // // Testing the keydown listener.
            // console.log('Key press down');
        },
        // Key up funtions are triggered when any key is release, but only after the key is fully 'triggered'
        keyup: (e) => {
            let $pressKey = e.key;
            if ($pressKey === 'Shift') {
                // Hide UPPERCASE keyboard
                $upperKeys.hide();
                // Show lowercase board
                $lowerKeys.show();
            }

            // // Testing the keyup listener.
            // console.log('key press released');
        },
        // Key press funtions are triggered when QWERTY keys + nums are fully triggered. DOES NOT register util keys. 
        keypress: (e) => {
            // Grab keyCode and insert into span ID grab
            let $litKey = $('#' + e.which);
            // Set highlight background color. 
            $litKey.css({ backgroundColor: '#83dfff', border: '1px solid #c0c0c0' });
            // keyUp function sets back to original background-color.
            $(document).keyup((e) => {
                $litKey.css({ backgroundColor: '#f5f5f5', border: '1px solid #e3e3e3' });
            });

            // Set target letter. 
            let $targLetter = $sentences[$sentenceNumber].charAt($characterNumber);
            // Get letter associated from keypress. 
            let $inputKey = e.key;

            if ($inputKey == $targLetter) {
                // Set charNum to increment
                $characterNumber++;

                // Set target letter and insert into text.
                let $targetLetter = $sentences[$sentenceNumber].charAt($characterNumber);
                $('#target-letter').text($targetLetter);

                // Add check mark to feedback div and increment correct keypress. 
                $('#feedback').append('✔️');
                $correctKeys++;

                console.log($targetLetter);
                // console.log($sentences[$sentenceNumber].length);
                // console.log($characterNumber);
                if ($sentences[$sentenceNumber].length == $characterNumber) {
                    $sentenceNumber++;

                    console.log($sentences[$sentenceNumber]);
                    console.log($characterNumber);

                    if ($sentences[$sentenceNumber] == $sentences.length) {
                        console.log('This means the end of the sentences array');
                    } else {
                        console.log('This means its going back into the query!')
                        // let $sentence = $sentences[$sentenceNumber];
                        // $('#sentence').text($sentence);
                        // $characterNumber = 0;
                        
                        // let $targetLetter = $sentences[$sentenceNumber].charAt($characterNumber);
                        // $('#target-letter').text($targetLetter);

                        // $('#feedback').empty();
                    }
                    // $('#sentence').text($sentences[$sentenceNumber]);

                }
                // console.log($characterNumber + ' ' + $targLetter);
            } else {
                // Add X mark to feedback div and increment incorrect keypress.
                $('#feedback').append('❌');
                $missedKeys++;
            }

            // console.log($inputKey);
            // $('#target-letter').text($targLetter);

            // // Testing the keypress listener.
            // console.log('QWERTY key triggered' + $characterNumber);
        }
    });
});
