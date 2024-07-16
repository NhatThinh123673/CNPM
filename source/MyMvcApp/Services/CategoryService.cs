using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class CategoryService
{
    private readonly HttpClient _httpClient;

    public CategoryService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<IEnumerable<Category>> GetCategoriesAsync()
    {
        var response = await _httpClient.GetAsync("http://localhost:3000/api/categories");
        response.EnsureSuccessStatusCode();

        var jsonString = await response.Content.ReadAsStringAsync();
        
        return JsonConvert.DeserializeObject<IEnumerable<Category>>(jsonString);
    }

    public async Task<Category> GetCategoryByIdAsync(int id)
    {
        var response = await _httpClient.GetAsync($"http://localhost:3000/api/categories/{id}");
        response.EnsureSuccessStatusCode();

        var jsonString = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<Category>(jsonString);
    }

    public async Task<Category> CreateCategoryAsync(Category category)
    {
        var content = new StringContent(JsonConvert.SerializeObject(category), System.Text.Encoding.UTF8, "application/json");
        var response = await _httpClient.PostAsync("http://localhost:3000/api/categories", content);
        response.EnsureSuccessStatusCode();

        var jsonString = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<Category>(jsonString);
    }

    public async Task<Category> UpdateCategoryAsync(int id, Category category)
    {
        var content = new StringContent(JsonConvert.SerializeObject(category), System.Text.Encoding.UTF8, "application/json");
        var response = await _httpClient.PutAsync($"http://localhost:3000/api/categories/{id}", content);
        response.EnsureSuccessStatusCode();

        var jsonString = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<Category>(jsonString);
    }

    public async Task DeleteCategoryAsync(int id)
    {
        var response = await _httpClient.DeleteAsync($"http://localhost:3000/api/categories/{id}");
        response.EnsureSuccessStatusCode();
    }
}
