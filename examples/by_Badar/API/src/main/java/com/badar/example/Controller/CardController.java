package com.badar.example.Controller;

import com.badar.example.Modal.Card;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/card")
public class CardController {
     private CopyOnWriteArrayList<Card> cardList = new CopyOnWriteArrayList<>();

    @GetMapping
    public List<Card> getAllCards() {
        return cardList;
    }

    @GetMapping("/{id}")
    public Card getSpecificCard(@PathVariable String id) {
        Card filteredCard = cardList.stream().filter(
                (currCard) -> {
                    return currCard.id.equals(id);
                }
        ).findFirst().get();
        return filteredCard;
    }

    @PostMapping
    public Card postCard(@RequestBody Card incomingCard){
        String idToSet = UUID.randomUUID().toString();
        if(incomingCard.id != null) {
            idToSet = incomingCard.id;
        }
        incomingCard.id = idToSet;
        cardList.add(incomingCard);
        return incomingCard;
    }

    @DeleteMapping("/{id}")
    public Boolean deleteCard(@PathVariable String id){
        Card filteredCard = cardList.stream().filter(
                (currCard) -> {
                    return currCard.id.equals(id);
                }
        ).findFirst().get();

        return cardList.remove(filteredCard);
    }

    @PutMapping("/{id}")
    public Card updateCard(@PathVariable String id,@RequestBody Card incomingCard ){
        Card filteredCard = cardList.stream().filter(
                (currCard) -> {
                    return currCard.id.equals(id);
                }
        ).findFirst().get();
        cardList.remove(filteredCard);
        return postCard(incomingCard);
    }

}

