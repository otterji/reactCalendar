package com.ssafy.shalendar.springboot.web;

import com.ssafy.shalendar.springboot.config.auth.LoginUser;
import com.ssafy.shalendar.springboot.config.auth.dto.SessionUser;
import com.ssafy.shalendar.springboot.service.posts.PostsService;
import com.ssafy.shalendar.springboot.web.dto.PostsResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RequiredArgsConstructor
@Controller
public class IndexController {

    private final PostsService postsService;

    @GetMapping("/")
    public String index(Model model, @LoginUser SessionUser user) {
        model.addAttribute("posts", postsService.findAllDesc());
        if (user != null) {
            model.addAttribute("memberName", user.getName());
        }
        return "index";
    }

    @GetMapping("/callback")
    public String callback(Model model, @LoginUser SessionUser user) {
        if (user != null) {
            model.addAttribute("memberName", user.getName());
            model.addAttribute("memberEmail", user.getEmail());
            model.addAttribute("memberPicture", user.getPicture());
        }
        return "callback";
    }

    @GetMapping("/posts/save")
    public String postsSave() {
        return "posts-save";
    }

    @GetMapping("/posts/update/{id}")
    public String postsUpdate(@PathVariable Long id, Model model) {
        PostsResponseDto dto = postsService.findById(id);
        model.addAttribute("post", dto);

        return "posts-update";
    }
}
