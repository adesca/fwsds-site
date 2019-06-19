package com.example.demo.person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/person")
public class controller {
    private final PersonRepository personRepository;

    @Autowired
    public controller(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @PostMapping
    public void persistNewPerson(@RequestBody Person person) {
        personRepository.save(person);
    }

    @GetMapping("/all")
    public Iterable<Person> getAllPeople() {
        return personRepository.findAll();
    }
}
