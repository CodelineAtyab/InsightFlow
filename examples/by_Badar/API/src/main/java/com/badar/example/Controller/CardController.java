package com.badar.example.Controller;

import com.badar.example.Modal.Card;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/card")
public class CardController {
     ArrayList<Card> cardList = new ArrayList<>();

    @GetMapping
    public ArrayList<Card> getAllCards() {
        return cardList;
    }

    @PostMapping
    public Card postCard(@RequestBody Card incomingCard){
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

