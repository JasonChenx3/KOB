package com.kob.backend.controller.pk;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pk/")
public class BotInfoController {
    @RequestMapping("getbotinfo/")
    public List<Map<String, String>> getBotInfo() {
        List<Map<String, String>> botlist = new LinkedList<>();
        Map<String, String> bot1 = new HashMap<>();
        bot1.put("name", "Jason");
        bot1.put("rating", "1000");
        Map<String, String> bot2 = new HashMap<>();
        bot2.put("name", "Jack");
        bot2.put("rating", "1100");
        botlist.add(bot1);
        botlist.add(bot2);
        return botlist;
    }
}
