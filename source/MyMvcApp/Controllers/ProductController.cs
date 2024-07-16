using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using MyMvcApp.Models;
using System.Linq;

namespace MyMvcApp.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            var products = GetSampleProducts();
            return View(products);
        }
        public IActionResult Category(string category)
        {
            var products = GetSampleProducts().Where(p => p.Category == category).ToList();
            ViewBag.Category = category;
            return View(products);
        }

        public IActionResult Details(int id)
        {
            var product = GetSampleProducts().Find(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return View(product);
        }

        private List<Product> GetSampleProducts()
        {
            return new List<Product>
            {
                new Product { Id = 1, Name = "Nước giặt OMO ", Description = "Nước giặt sạch sâu", Price = 300000M, ImageUrl = "/images/Nuoc giat omo.jpg" },
                new Product { Id = 2, Name = "Nước mắm", Description = "Nước mắm chinsu", Price = 64000M, ImageUrl = "/images/Nuoc mam chinsu.jpg" },
                new Product { Id = 3, Name = "Thịt", Description = "Thịt ba chỉ", Price = 232000M, ImageUrl = "/images/thit-ba-chi.jpg" },
                new Product { Id = 3, Name = "Trái cây", Description = "Táo", Price = 232000M, ImageUrl = "/images/Tao.jpg" },
                new Product { Id = 3, Name = "Dầu ăn", Description = "Dầu ăn Tường An", Price = 232000M, ImageUrl = "/images/dau an.jpg" },
                new Product { Id = 3, Name = "Gạo", Description = "Gạo ST25", Price = 232000M, ImageUrl = "/images/gao.jpg" },
                new Product { Id = 3, Name = "Mì", Description = "Mì Hảo Hảo", Price = 232000M, ImageUrl = "/images/mi tom.jpg" },
                new Product { Id = 3, Name = "Bia", Description = "Bia Tiger", Price = 232000M, ImageUrl = "/images/bia.jpg" }
            };
        }
    }
}
