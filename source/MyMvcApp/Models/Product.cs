﻿using System.ComponentModel.DataAnnotations;

namespace MyMvcApp.Models
{
    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public string Category { get; internal set; }
    }
}
