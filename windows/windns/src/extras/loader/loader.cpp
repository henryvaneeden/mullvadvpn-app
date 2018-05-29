#include "stdafx.h"
#include <iostream>
#include <conio.h>
#include "windns/windns.h"

void WINDNS_API ErrorSink(const char *errorMessage, void *context)
{
	std::cout << "Error: " << errorMessage << std::endl;
}

int main()
{
	std::wcout << L"Init: " << WinDns_Initialize(ErrorSink, nullptr) << std::endl;

	const wchar_t *servers[] =
	{
		L"8.8.8.8",
		L"1.1.1.1"
	};

	std::wcout << L"Set: " << WinDns_Set(servers, _countof(servers)) << std::endl;

	std::wcout << L"Press a key to abort DNS monitoring + enforcing..." << std::endl;
	_getwch();

	std::wcout << L"Reset: " << WinDns_Reset() << std::endl;

	std::wcout << L"Set: " << WinDns_Set(servers, _countof(servers)) << std::endl;

	std::wcout << L"Press a key to abort DNS monitoring + enforcing..." << std::endl;
	_getwch();

	std::wcout << L"Reset: " << WinDns_Reset() << std::endl;

	std::wcout << L"Deinit: " << WinDns_Deinitialize() << std::endl;

	return 0;
}