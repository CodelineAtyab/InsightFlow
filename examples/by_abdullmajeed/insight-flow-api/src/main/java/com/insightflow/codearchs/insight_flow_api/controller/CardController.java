package com.insightflow.codearchs.insight_flow_api.controller;

import com.insightflow.codearchs.insight_flow_api.model.Card;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

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
        Optional<Card> filteredCard = cardStore.stream()
                .filter(currCard -> currCard.id.equals(id))
                .findFirst();

        return filteredCard.orElseThrow(() -> new RuntimeException("Card not found with ID: " + id));
    }

    @PostMapping
    public Card addCard(@RequestBody Card incomingCard) {
        cardStore.add(incomingCard);
        return incomingCard;
    }

    @PutMapping(path = "/{id}")
    public Card updateCardById(@PathVariable String id, @RequestBody Card updatedCard) {
        Optional<Card> existingCard = cardStore.stream()
                .filter(currCard -> currCard.id.equals(id))
                .findFirst();

        if (existingCard.isPresent()) {
            Card card = existingCard.get();
            card.setContent(updatedCard.getContent()); // Update content
            return card;
        } else {
            throw new RuntimeException("Card not found with ID: " + id);
        }
    }

    @DeleteMapping(path = "/{id}")
    public String deleteCardById(@PathVariable String id) {
        boolean removed = cardStore.removeIf(currCard -> currCard.id.equals(id));
        if (removed) {
            return "Card with ID " + id + " was successfully deleted.";
        } else {
            throw new RuntimeException("Card not found with ID: " + id);
        }
    }

    @DeleteMapping
    public String deleteAllCards() {
        cardStore.clear();
        return "All cards have been successfully deleted.";
    }
}
