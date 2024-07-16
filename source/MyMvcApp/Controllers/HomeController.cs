using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MyMvcApp.Models;

namespace MyMvcApp.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
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

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        var products = GetSampleProducts();
        return View(products);
    }

    public IActionResult Category()
    {
        var products = GetSampleProducts();
        return View(products);
    }

    public IActionResult ProductDetail(int id)
    {
        var product = GetSampleProducts().Find(p => p.Id == id);
        return View(product);
    }


    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
