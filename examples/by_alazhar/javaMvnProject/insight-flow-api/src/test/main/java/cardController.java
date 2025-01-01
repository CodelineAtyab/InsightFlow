package org.example.controller;

import org.springframework.web.bind.annotation.*;


import javax.smartcardio.Card;
import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/v1/card")

public class cardController {

        private ArrayList<Card> cardStore = new ArrayList<>();

        @GetMapping
        public ArrayList<Card> getAllCards() {
            return cardStore;
        }

        @GetMapping(path = "/{id}")
        public Card getSpecificCard(@PathVariable String id) {

            Card filteredCard = cardStore.stream().filter(
                    (currCard) -> {
                        return currCard.id.equals(id);
                    }
            ).findFirst().get();

            return filteredCard;

        }

        @PostMapping
        public Card getAllTheCard(@RequestBody Card incomingCard) {
            cardStore.add(incomingCard);
            return incomingCard;
        }
    }
}
