package com.example.server.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
@RestController
@RequestMapping("/upload")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class DownloadFileController {

    @PostMapping()
    public boolean create(@RequestBody MultipartFile file) {
        String currentDirectory = System.getProperty("user.dir");
        String absoluteFilePath = currentDirectory + "/src/main/resources/static/image/";
        String fileName = file.getOriginalFilename();
        String filePath = absoluteFilePath + fileName;
        try {
            file.transferTo(new File(filePath));
            return true;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return false;
    }
    @GetMapping
    public String hello(){
        return "Hello";
    }
}




