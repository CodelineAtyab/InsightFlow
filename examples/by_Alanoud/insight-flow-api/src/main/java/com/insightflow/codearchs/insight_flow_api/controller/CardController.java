package com.insightflow.codearchs.insight_flow_api.controller;


import com.insightflow.codearchs.insight_flow_api.model.Card;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/v1/card")
public class CardController {
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

    @DeleteMapping(path = "/{id}")
    public String deleteByCardId(@PathVariable String id) {
        cardStore.removeIf(currCard -> currCard.id.equals(id));
        return "deleted";

    }
    @PutMapping(path = "/{id}")
    public Card updateSpecificCard(@PathVariable String id, @RequestBody Card updatedCard) {
        for (int i = 0; i < cardStore.size(); i++) {
            if (cardStore.get(i).id.equals(id)) {

                cardStore.set(i, updatedCard);
                return updatedCard;
            }
        }
        throw new RuntimeException("Card with id " + id);
    }
}

